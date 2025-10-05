import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Test database connection
prisma
  .$connect()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((error: unknown) => {
    console.error('Failed to connect to database:', error);
    console.log(
      'DATABASE_URL status:',
      process.env.DATABASE_URL ? 'Set' : 'Not set'
    );
  });

export default prisma;
