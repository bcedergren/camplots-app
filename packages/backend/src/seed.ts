import prisma from './db';
import bcrypt from 'bcryptjs';

async function seedUsers() {
  try {
    console.log('Seeding users...');

    // Create a test user
    const testUser = {
      username: 'testuser',
      email: 'test@camplots.com',
      passwordHash: await bcrypt.hash('password123', 10),
      subscriptionType: 'Premium',
    };

    await prisma.user.create({
      data: testUser,
    });

    console.log('Test user created:');
    console.log('Email: test@camplots.com');
    console.log('Password: password123');
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

async function seedHosts() {
  try {
    console.log('Seeding hosts...');

    const hosts = [
      {
        name: 'Mountain View Campground',
        type: 'Campground',
        location: {
          address: '123 Mountain Road',
          city: 'Denver',
          state: 'CO',
          zipCode: '80202',
          coordinates: { lat: 39.7392, lng: -104.9903 },
        },
        amenities: ['WiFi', 'Showers', 'Fire Pits', 'Hiking Trails'],
      },
      {
        name: 'Lakefront RV Park',
        type: 'RV Park',
        location: {
          address: '456 Lake Drive',
          city: 'Austin',
          state: 'TX',
          zipCode: '78701',
          coordinates: { lat: 30.2672, lng: -97.7431 },
        },
        amenities: ['Full Hookups', 'Laundry', 'Pool', 'Fishing'],
      },
      {
        name: 'Forest Retreat Cabin',
        type: 'Cabin',
        location: {
          address: '789 Forest Lane',
          city: 'Asheville',
          state: 'NC',
          zipCode: '28801',
          coordinates: { lat: 35.5951, lng: -82.5515 },
        },
        amenities: ['Kitchen', 'Fireplace', 'Hot Tub', 'Mountain Views'],
      },
      {
        name: 'Desert Oasis Glamping',
        type: 'Glamping',
        location: {
          address: '321 Desert Trail',
          city: 'Sedona',
          state: 'AZ',
          zipCode: '86336',
          coordinates: { lat: 34.8697, lng: -111.761 },
        },
        amenities: [
          'Luxury Tents',
          'Private Bathrooms',
          'Spa Services',
          'Stargazing',
        ],
      },
    ];

    for (const host of hosts) {
      await prisma.host.create({
        data: host,
      });
    }

    console.log('Hosts seeded successfully!');
  } catch (error) {
    console.error('Error seeding hosts:', error);
  }
}

async function seedAll() {
  try {
    await seedUsers();
    await seedHosts();
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAll();
