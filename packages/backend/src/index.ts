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

app.get('/', async (req, res) => {
  // Check if setup=true query parameter is present
  if (req.query.setup === 'true') {
    try {
      const { default: prisma } = await import('./db');
      const bcrypt = require('bcryptjs');

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: 'test@camplots.com' },
      });

      if (existingUser) {
        return res.json({
          message: 'Test user already exists!',
          email: 'test@camplots.com',
          password: 'password123',
          status: 'ready for login',
          instructions: 'You can now login with these credentials',
        });
      }

      // Create the test user directly
      const crypto = require('crypto');
      const userId = crypto.randomUUID();

      const testUser = await prisma.user.create({
        data: {
          userId: userId,
          username: 'testuser',
          email: 'test@camplots.com',
          passwordHash: await bcrypt.hash('password123', 10),
          subscriptionType: 'Premium',
        },
      });

      return res.json({
        message: 'Test user created successfully!',
        email: 'test@camplots.com',
        password: 'password123',
        status: 'ready for login',
        userId: testUser.userId,
        instructions: 'You can now login with these credentials',
      });
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Database tables might not exist yet. Try visiting /?migrate=true first',
      });
    }
  }

  // Check if migrate=true query parameter is present
  if (req.query.migrate === 'true') {
    try {
      const { default: prisma } = await import('./db');
      console.log('Creating database tables manually...');

      // Create User table
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "User" (
          "userId" TEXT NOT NULL PRIMARY KEY,
          "username" TEXT NOT NULL,
          "email" TEXT NOT NULL UNIQUE,
          "passwordHash" TEXT NOT NULL,
          "subscriptionType" TEXT NOT NULL DEFAULT 'Basic',
          "resetToken" TEXT,
          "resetTokenExpiry" TIMESTAMP(3),
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create Host table
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Host" (
          "hostId" TEXT NOT NULL PRIMARY KEY,
          "name" TEXT NOT NULL,
          "type" TEXT NOT NULL,
          "location" JSONB NOT NULL,
          "amenities" TEXT[],
          "image" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create Booking table
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Booking" (
          "bookingId" TEXT NOT NULL PRIMARY KEY,
          "userId" TEXT NOT NULL,
          "hostId" TEXT NOT NULL,
          "dates" JSONB NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'pending',
          "totalAmount" DOUBLE PRECISION NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create Payment table
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Payment" (
          "paymentId" TEXT NOT NULL PRIMARY KEY,
          "bookingId" TEXT NOT NULL,
          "amount" DOUBLE PRECISION NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'pending',
          "method" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('Database tables created successfully');
      return res.json({
        success: true,
        message: 'Database tables created successfully',
        tables: ['User', 'Host', 'Booking', 'Payment'],
        nextStep: 'Now visit /?setup=true to create test user',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Table creation failed:', error);
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Test login endpoint
  if (req.query.testLogin === 'true') {
    try {
      const { default: prisma } = await import('./db');
      const bcrypt = require('bcryptjs');
      const jwt = require('jsonwebtoken');

      const email = 'test@camplots.com';
      const password = 'password123';

      console.log('Testing login for:', email);

      // Find user
      const user = await prisma.user.findUnique({ where: { email } });
      console.log('User found:', !!user);

      if (!user) {
        return res.json({
          step: 'user_lookup',
          success: false,
          message: 'User not found',
          email: email,
        });
      }

      // Test password
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      console.log('Password match:', passwordMatch);

      if (!passwordMatch) {
        return res.json({
          step: 'password_check',
          success: false,
          message: 'Password does not match',
          hashLength: user.passwordHash.length,
          hashPreview: user.passwordHash.substring(0, 20) + '...',
        });
      }

      // Generate token
      const token = jwt.sign(
        { userId: user.userId },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );

      return res.json({
        step: 'complete',
        success: true,
        message: 'Login test successful',
        userId: user.userId,
        tokenGenerated: !!token,
        tokenPreview: token.substring(0, 20) + '...',
      });
    } catch (error) {
      return res.json({
        step: 'error',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Check if seed=true query parameter is present
  if (req.query.seed === 'true') {
    try {
      const { seedUsers, seedHosts } = await import('./seed');

      let results = {
        step: 'seed',
        users: { created: 0, skipped: 0, errors: [] },
        hosts: { created: 0, skipped: 0, errors: [] },
        success: false,
        message: '',
      };

      // Seed users
      try {
        const userResult = await seedUsers();
        results.users = {
          created: userResult.created || 0,
          skipped: userResult.skipped || 0,
          errors: userResult.errors || [],
        };
      } catch (error) {
        results.users.errors.push(
          error instanceof Error ? error.message : 'Unknown user seeding error'
        );
      }

      // Seed hosts
      try {
        const hostResult = await seedHosts();
        results.hosts = {
          created: hostResult.created || 0,
          skipped: hostResult.skipped || 0,
          errors: hostResult.errors || [],
        };
      } catch (error) {
        results.hosts.errors.push(
          error instanceof Error ? error.message : 'Unknown host seeding error'
        );
      }

      results.success =
        results.users.errors.length === 0 && results.hosts.errors.length === 0;
      results.message = `Database seeded successfully! Created ${results.users.created} users and ${results.hosts.created} campsites.`;

      return res.json(results);
    } catch (error) {
      return res.json({
        step: 'seed',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown seeding error',
      });
    }
  }

  // Check if debug=true query parameter is present
  if (req.query.debug === 'true') {
    try {
      const { default: prisma } = await import('./db');

      // Check if tables exist
      const tableCheck = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('User', 'Host', 'Booking', 'Payment')
      `;

      // Count users
      let userCount = 0;
      let users = [];
      try {
        userCount = await prisma.user.count();
        users = await prisma.user.findMany({
          select: {
            userId: true,
            email: true,
            username: true,
            subscriptionType: true,
            createdAt: true,
          },
        });
      } catch (e) {
        console.log('User table might not exist yet');
      }

      // Test password if test user exists
      let passwordTest = null;
      const testUser = users.find((u) => u.email === 'test@camplots.com');
      if (testUser) {
        try {
          // Get full user data with password hash
          const fullUser = await prisma.user.findUnique({
            where: { email: 'test@camplots.com' },
          });
          if (fullUser) {
            const bcrypt = require('bcryptjs');
            const isPasswordMatch = await bcrypt.compare(
              'password123',
              fullUser.passwordHash
            );
            passwordTest = {
              hashLength: fullUser.passwordHash.length,
              passwordMatch: isPasswordMatch,
              hashPreview: fullUser.passwordHash.substring(0, 20) + '...',
            };
          }
        } catch (e) {
          passwordTest = {
            error: e instanceof Error ? e.message : 'Unknown error',
          };
        }
      }

      return res.json({
        database: 'connected',
        tables: tableCheck,
        userCount: userCount,
        users: users,
        testUserExists: users.some((u) => u.email === 'test@camplots.com'),
        passwordTest: passwordTest,
        environment: {
          NODE_ENV: process.env.NODE_ENV,
          JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Default response with instructions
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>CampLots Backend API</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .step { background: #f0f8ff; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .credentials { background: #f0fff0; padding: 15px; margin: 10px 0; border-radius: 5px; }
        a { color: #0066cc; text-decoration: none; font-weight: bold; }
        a:hover { text-decoration: underline; }
        .button { 
          display: inline-block; 
          background: #007cba; 
          color: white; 
          padding: 10px 20px; 
          margin: 5px; 
          border-radius: 5px; 
          text-decoration: none; 
        }
        .button:hover { background: #005a87; }
      </style>
    </head>
    <body>
      <h1>🏕️ CampLots Backend API</h1>
      <p>✅ Backend is running successfully!</p>
      
      <div class="step">
        <h2>📋 Setup Instructions:</h2>
        <p><strong>Step 1:</strong> <a href="/?migrate=true" class="button">🔧 Run Database Migration</a></p>
        <p><strong>Step 2:</strong> <a href="/?setup=true" class="button">👤 Create Test User</a></p>
        <p><strong>Debug:</strong> <a href="/?debug=true" class="button">🔍 Check Database Status</a></p>
        <p><strong>Test Login:</strong> <a href="/?testLogin=true" class="button">🔐 Test Login Flow</a></p>
        <p><strong>Seed Database:</strong> <a href="/?seed=true" class="button">🌱 Add Test Campsites</a></p>
      </div>
      
      <div class="credentials">
        <h2>🔑 Test Credentials:</h2>
        <ul>
          <li><strong>Email:</strong> test@camplots.com</li>
          <li><strong>Password:</strong> password123</li>
        </ul>
      </div>
      
      <h2>🔗 API Endpoints:</h2>
      <ul>
        <li><a href="/health">Health Check</a></li>
        <li><a href="/debug/users">Debug: View Users</a></li>
        <li>POST /api/v1/users/login - Login endpoint</li>
        <li>POST /api/v1/users/register - Registration endpoint</li>
      </ul>
      
      <p><em>Note: Complete both setup steps above, then try logging in with the test credentials!</em></p>
    </body>
    </html>
  `);
});

// Simple test registration without requiring frontend
app.get('/create-test-user', async (req, res) => {
  try {
    const { default: prisma } = await import('./db');
    const bcrypt = require('bcryptjs');

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@camplots.com' },
    });

    if (existingUser) {
      return res.json({
        message: 'Test user already exists!',
        email: 'test@camplots.com',
        password: 'password123',
        status: 'ready for login',
      });
    }

    // Create the test user directly
    const testUser = await prisma.user.create({
      data: {
        username: 'testuser',
        email: 'test@camplots.com',
        passwordHash: await bcrypt.hash('password123', 10),
        subscriptionType: 'Premium',
      },
    });

    res.json({
      message: 'Test user created successfully!',
      email: 'test@camplots.com',
      password: 'password123',
      status: 'ready for login',
      userId: testUser.userId,
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Database tables might not exist yet',
    });
  }
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
      cwd: process.cwd(),
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
      where: { email: 'test@camplots.com' },
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
