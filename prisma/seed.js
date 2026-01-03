const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create sample users
    const user1Password = await bcrypt.hash('password123', 10);
    const user2Password = await bcrypt.hash('password123', 10);

    const user1 = await prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password_hash: user1Password,
        phone: '+1234567890',
        city: 'New York',
        country: 'USA',
        additional_info: 'Travel enthusiast',
      },
    });

    const user2 = await prisma.user.upsert({
      where: { email: 'jane.smith@example.com' },
      update: {},
      create: {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        password_hash: user2Password,
        phone: '+1234567891',
        city: 'Los Angeles',
        country: 'USA',
      },
    });

    console.log('✅ Users created');

    // Create activity tags
    const tags = ['adventure', 'culture', 'food', 'nature', 'historical', 'shopping', 'nightlife'];
    const createdTags = [];

    for (const tagName of tags) {
      const tag = await prisma.activityTag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });
      createdTags.push(tag);
    }

    console.log('✅ Activity tags created');

    // Create sample activities
    const activities = [
      {
        name: 'Eiffel Tower Visit',
        city: 'Paris',
        country: 'France',
        category: 'sightseeing',
        description: 'Visit the iconic Eiffel Tower',
        address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
        latitude: 48.8584,
        longitude: 2.2945,
        avg_duration_minutes: 120,
        avg_cost: 25.0,
        rating: 4.8,
      },
      {
        name: 'Louvre Museum',
        city: 'Paris',
        country: 'France',
        category: 'museum',
        description: 'World-famous art museum',
        address: 'Rue de Rivoli, 75001 Paris',
        latitude: 48.8606,
        longitude: 2.3376,
        avg_duration_minutes: 180,
        avg_cost: 17.0,
        rating: 4.7,
      },
      {
        name: 'Tokyo Skytree',
        city: 'Tokyo',
        country: 'Japan',
        category: 'sightseeing',
        description: 'Tallest structure in Japan',
        address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo',
        latitude: 35.7101,
        longitude: 139.8107,
        avg_duration_minutes: 90,
        avg_cost: 20.0,
        rating: 4.6,
      },
    ];

    for (const activityData of activities) {
      const activity = await prisma.activity.create({
        data: activityData,
      });

      // Add random tags
      const randomTags = createdTags.slice(0, Math.floor(Math.random() * 3) + 1);
      for (const tag of randomTags) {
        await prisma.activityTagMap.create({
          data: {
            activity_id: activity.id,
            tag_id: tag.id,
          },
        });
      }
    }

    console.log('✅ Activities created');

    // Create sample trip
    const trip = await prisma.trip.create({
      data: {
        user_id: user1.id,
        title: 'Paris Adventure',
        description: 'A wonderful trip to Paris',
        start_date: new Date('2026-06-01'),
        end_date: new Date('2026-06-07'),
        status: 'planning',
        total_budget: 2000.0,
      },
    });

    // Create user trip link
    await prisma.userTripLink.create({
      data: {
        user_id: user1.id,
        trip_id: trip.id,
        relation_type: 'owner',
      },
    });

    console.log('✅ Sample trip created');

    // Create trip budgets
    await prisma.tripBudget.createMany({
      data: [
        { trip_id: trip.id, category: 'accommodation', planned_amount: 700, notes: 'Hotel costs' },
        { trip_id: trip.id, category: 'food', planned_amount: 500, notes: 'Meals and dining' },
        { trip_id: trip.id, category: 'transportation', planned_amount: 300, notes: 'Metro and taxis' },
        { trip_id: trip.id, category: 'activities', planned_amount: 400, notes: 'Tours and entrance fees' },
        { trip_id: trip.id, category: 'shopping', planned_amount: 100, notes: 'Souvenirs' },
      ],
    });

    console.log('✅ Trip budgets created');

    // Create community post
    await prisma.communityPost.create({
      data: {
        user_id: user1.id,
        trip_id: trip.id,
        title: 'Amazing Paris Trip Planning!',
        content: 'Just finished planning my Paris trip. Can\'t wait to visit the Eiffel Tower and explore the city!',
        city: 'Paris',
        country: 'France',
      },
    });

    console.log('✅ Community post created');

    console.log('\n✨ Seeding completed successfully!');
    console.log('\n📧 Test credentials:');
    console.log('   Email: john.doe@example.com');
    console.log('   Password: password123');
    console.log('\n   Email: jane.smith@example.com');
    console.log('   Password: password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
