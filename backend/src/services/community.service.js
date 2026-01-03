const { prisma } = require('../config/database');
const { AppError } = require('../utils/helpers');

const communityService = {
  // Get community posts with filters
  getPosts: async (filters = {}, userId) => {
    const { city, country, limit = 20, offset = 0 } = filters;

    const where = {};
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (country) where.country = { contains: country, mode: 'insensitive' };

    const [posts, total] = await Promise.all([
      prisma.communityPost.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              avatar_url: true,
            },
          },
          trip: {
            select: {
              id: true,
              title: true,
            },
          },
          _count: {
            select: {
              comments: true,
              reactions: true,
            },
          },
          reactions: userId ? {
            where: { user_id: userId },
          } : false,
        },
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { created_at: 'desc' },
      }),
      prisma.communityPost.count({ where }),
    ]);

    return { posts, total, limit: parseInt(limit), offset: parseInt(offset) };
  },

  // Get post by ID
  getPostById: async (postId, userId) => {
    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
            city: true,
            country: true,
          },
        },
        trip: {
          select: {
            id: true,
            title: true,
            start_date: true,
            end_date: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                avatar_url: true,
              },
            },
          },
          orderBy: { created_at: 'desc' },
        },
        reactions: true,
        _count: {
          select: {
            comments: true,
            reactions: true,
          },
        },
      },
    });

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    // Group reactions by type
    const reactionsByType = post.reactions.reduce((acc, reaction) => {
      if (!acc[reaction.reaction_type]) {
        acc[reaction.reaction_type] = 0;
      }
      acc[reaction.reaction_type]++;
      return acc;
    }, {});

    // Check if current user has reacted
    const userReaction = userId 
      ? post.reactions.find(r => r.user_id === userId)
      : null;

    return {
      ...post,
      reactionsByType,
      userReaction: userReaction?.reaction_type || null,
    };
  },

  // Create post
  createPost: async (userId, postData) => {
    const { trip_id, title, content, city, country } = postData;

    // If trip_id provided, verify ownership
    if (trip_id) {
      const trip = await prisma.trip.findUnique({
        where: { id: trip_id },
      });

      if (!trip) {
        throw new AppError('Trip not found', 404);
      }

      if (trip.user_id !== userId) {
        throw new AppError('You can only create posts for your own trips', 403);
      }
    }

    const post = await prisma.communityPost.create({
      data: {
        user_id: userId,
        trip_id,
        title,
        content,
        city,
        country,
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
      },
    });

    return post;
  },

  // Update post
  updatePost: async (postId, userId, updateData) => {
    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    if (post.user_id !== userId) {
      throw new AppError('You can only update your own posts', 403);
    }

    const updatedPost = await prisma.communityPost.update({
      where: { id: postId },
      data: updateData,
    });

    return updatedPost;
  },

  // Delete post
  deletePost: async (postId, userId) => {
    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    if (post.user_id !== userId) {
      throw new AppError('You can only delete your own posts', 403);
    }

    await prisma.communityPost.delete({
      where: { id: postId },
    });

    return { message: 'Post deleted successfully' };
  },

  // Add comment
  addComment: async (postId, userId, content) => {
    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    const comment = await prisma.communityComment.create({
      data: {
        post_id: postId,
        user_id: userId,
        content,
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
      },
    });

    return comment;
  },

  // Add/update reaction
  addReaction: async (postId, userId, reactionType) => {
    const validReactions = ['like', 'love', 'helpful', 'inspiring'];
    
    if (!validReactions.includes(reactionType)) {
      throw new AppError(`Invalid reaction type. Must be one of: ${validReactions.join(', ')}`, 400);
    }

    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    // Check if user already reacted with this type
    const existingReaction = await prisma.communityReaction.findFirst({
      where: {
        post_id: postId,
        user_id: userId,
        reaction_type: reactionType,
      },
    });

    if (existingReaction) {
      // Remove reaction (toggle off)
      await prisma.communityReaction.delete({
        where: { id: existingReaction.id },
      });
      return { message: 'Reaction removed', action: 'removed' };
    }

    // Remove any other reaction from this user on this post
    await prisma.communityReaction.deleteMany({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });

    // Add new reaction
    const reaction = await prisma.communityReaction.create({
      data: {
        post_id: postId,
        user_id: userId,
        reaction_type: reactionType,
      },
    });

    return { message: 'Reaction added', action: 'added', reaction };
  },
};

module.exports = communityService;
