import apiClient from '../client';
import { endpoints } from '../endpoints';
import {
  ApiResponse,
  Post,
  CreatePostRequest,
  Comment,
  CreateReactionRequest,
} from '../types';

export const communityService = {
  /**
   * Get community posts
   */
  getPosts: async (params?: {
    city?: string;
    country?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<Post[]>> => {
    const response = await apiClient.get(endpoints.community.posts.list, { params });
    return response.data;
  },

  /**
   * Create post
   */
  createPost: async (data: CreatePostRequest): Promise<ApiResponse<Post>> => {
    const response = await apiClient.post(endpoints.community.posts.create, data);
    return response.data;
  },

  /**
   * Get post by ID
   */
  getPostById: async (id: number): Promise<ApiResponse<Post>> => {
    const response = await apiClient.get(endpoints.community.posts.get(id));
    return response.data;
  },

  /**
   * Update post
   */
  updatePost: async (id: number, data: Partial<CreatePostRequest>): Promise<ApiResponse<Post>> => {
    const response = await apiClient.put(endpoints.community.posts.update(id), data);
    return response.data;
  },

  /**
   * Delete post
   */
  deletePost: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(endpoints.community.posts.delete(id));
    return response.data;
  },

  /**
   * Add comment to post
   */
  addComment: async (postId: number, content: string): Promise<ApiResponse<Comment>> => {
    const response = await apiClient.post(endpoints.community.posts.addComment(postId), {
      content,
    });
    return response.data;
  },

  /**
   * Add reaction to post
   */
  addReaction: async (
    postId: number,
    data: CreateReactionRequest
  ): Promise<ApiResponse<null>> => {
    const response = await apiClient.post(endpoints.community.posts.addReaction(postId), data);
    return response.data;
  },

  /**
   * Remove reaction from post
   */
  removeReaction: async (postId: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(endpoints.community.posts.removeReaction(postId));
    return response.data;
  },
};
