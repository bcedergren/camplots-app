import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import hostRoutes from './routes/hostRoutes';
import bookingRoutes from './routes/bookingRoutes';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Log environment variables for debugging (without exposing sensitive data)
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: port,
  DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
  JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
});

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/hosts', hostRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/health', async (req, res) => {
  try {
    // Import prisma inside the route to avoid startup issues
    const { default: prisma } = await import('./db');
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

app.get('/debug/users', async (req, res) => {
  try {
    const { default: prisma } = await import('./db');
    const userCount = await prisma.user.count();
    const users = await prisma.user.findMany({
      select: {
        userId: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });
    res.json({
      userCount,
      users,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

app.get('/setup/migrate', async (req, res) => {
  try {
    const { execSync } = require('child_process');
    console.log('Running database migrations...');
    const output = execSync('npx prisma migrate deploy', { 
      encoding: 'utf8',
      cwd: process.cwd()
    });
    console.log('Migration output:', output);
    res.json({
      success: true,
      message: 'Database migrations completed successfully',
      output: output,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Migration failed:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

app.get('/setup/seed', async (req, res) => {
  try {
    const { default: prisma } = await import('./db');
    const bcrypt = require('bcryptjs');
    
    console.log('Seeding database...');
    
    // Check if test user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@camplots.com' }
    });
    
    if (existingUser) {
      return res.json({
        success: true,
        message: 'Test user already exists',
        user: {
          email: existingUser.email,
          username: existingUser.username,
        },
        timestamp: new Date().toISOString(),
      });
    }
    
    // Create test user
    const testUser = await prisma.user.create({
      data: {
        username: 'testuser',
        email: 'test@camplots.com',
        passwordHash: await bcrypt.hash('password123', 10),
        subscriptionType: 'Premium',
      },
    });
    
    console.log('Test user created:', testUser.email);
    
    res.json({
      success: true,
      message: 'Database seeded successfully',
      user: {
        email: testUser.email,
        username: testUser.username,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Seeding failed:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
