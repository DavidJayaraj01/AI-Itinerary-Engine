require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearTestUsers() {
  try {
    // Delete users with test emails
    const result = await prisma.user.deleteMany({
      where: {
        OR: [
          { email: { contains: 'test' } },
          { email: { contains: 'davidbeniel2006' } },
          { first_name: 'klassy' },
        ]
      }
    });

    console.log(`✅ Deleted ${result.count} test user(s)`);
    
    // Show remaining users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      }
    });
    
    console.log('\n📋 Remaining users in database:');
    console.table(users);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearTestUsers();
