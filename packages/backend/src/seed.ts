import prisma from './db';
import bcrypt from 'bcryptjs';

export async function seedUsers() {
  try {
    console.log('Seeding users...');

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@camplots.com' },
    });

    if (existingUser) {
      console.log('Test user already exists, skipping...');
      return { created: 0, skipped: 1, errors: [] };
    }

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

    return { created: 1, skipped: 0, errors: [] };
  } catch (error) {
    console.error('Error seeding users:', error);
    return {
      created: 0,
      skipped: 0,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}

export async function seedHosts() {
  try {
    console.log('Seeding hosts...');

    let created = 0;
    let skipped = 0;
    const errors = [];

    const hosts = [
      // Mountain/Colorado Locations
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
        name: 'Rocky Mountain High Camp',
        type: 'Tent Camping',
        location: {
          address: '2500 Alpine Drive',
          city: 'Aspen',
          state: 'CO',
          zipCode: '81611',
          coordinates: { lat: 39.1911, lng: -106.8175 },
        },
        amenities: [
          'Mountain Views',
          'Hiking',
          'Fishing',
          'Wildlife Viewing',
          'Restrooms',
        ],
      },

      // Lake/Water Locations
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
        name: 'Crystal Lake Resort',
        type: 'Resort',
        location: {
          address: '888 Crystal Waters Blvd',
          city: 'Lake Tahoe',
          state: 'CA',
          zipCode: '96150',
          coordinates: { lat: 39.0968, lng: -120.0324 },
        },
        amenities: [
          'Lake Access',
          'Kayak Rentals',
          'Restaurant',
          'Spa',
          'WiFi',
          'Fishing',
        ],
      },

      // Forest/Cabin Locations
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
        name: 'Redwood Grove Cabins',
        type: 'Cabin',
        location: {
          address: '1200 Redwood Highway',
          city: 'Eureka',
          state: 'CA',
          zipCode: '95501',
          coordinates: { lat: 40.8021, lng: -124.1637 },
        },
        amenities: [
          'Kitchen',
          'WiFi',
          'Pet Friendly',
          'Hiking Trails',
          'Fire Pits',
        ],
      },

      // Desert/Southwest Locations
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
      {
        name: 'Cactus Valley Campground',
        type: 'Campground',
        location: {
          address: '555 Desert Rose Road',
          city: 'Phoenix',
          state: 'AZ',
          zipCode: '85001',
          coordinates: { lat: 33.4484, lng: -112.074 },
        },
        amenities: ['Pool', 'Showers', 'Laundry', 'Fire Pits', 'WiFi'],
      },

      // Beach/Coastal Locations
      {
        name: 'Pacific Coast Glamping',
        type: 'Glamping',
        location: {
          address: '777 Ocean View Drive',
          city: 'Monterey',
          state: 'CA',
          zipCode: '93940',
          coordinates: { lat: 36.6002, lng: -121.8947 },
        },
        amenities: [
          'Ocean Views',
          'Luxury Tents',
          'Restaurant',
          'Spa',
          'Beach Access',
        ],
      },
      {
        name: 'Seaside RV Resort',
        type: 'RV Park',
        location: {
          address: '999 Coastal Highway',
          city: 'Myrtle Beach',
          state: 'SC',
          zipCode: '29577',
          coordinates: { lat: 33.6891, lng: -78.8867 },
        },
        amenities: [
          'Full Hookups',
          'Pool',
          'Beach Access',
          'WiFi',
          'Laundry',
          'Restaurant',
        ],
      },

      // National Park Area
      {
        name: 'Yellowstone Gateway Camp',
        type: 'Tent Camping',
        location: {
          address: '1500 Park Entrance Road',
          city: 'West Yellowstone',
          state: 'MT',
          zipCode: '59758',
          coordinates: { lat: 44.6596, lng: -111.104 },
        },
        amenities: [
          'Park Access',
          'Wildlife Viewing',
          'Hiking',
          'Fire Pits',
          'Restrooms',
        ],
      },

      // Unique/Adventure Locations
      {
        name: 'Treehouse Adventure Lodge',
        type: 'Unique Stay',
        location: {
          address: '333 Canopy Trail',
          city: 'Olympic',
          state: 'WA',
          zipCode: '98501',
          coordinates: { lat: 47.0379, lng: -122.9015 },
        },
        amenities: [
          'Treehouses',
          'Zip Lines',
          'Hiking',
          'Wildlife Viewing',
          'Restaurant',
        ],
      },
      {
        name: 'Historic Ranch Camping',
        type: 'Ranch Stay',
        location: {
          address: '2000 Ranch Road',
          city: 'Jackson',
          state: 'WY',
          zipCode: '83001',
          coordinates: { lat: 43.4799, lng: -110.7624 },
        },
        amenities: [
          'Horseback Riding',
          'Fishing',
          'Hiking',
          'Farm Activities',
          'Restaurant',
        ],
      },

      // Family-Friendly Options
      {
        name: 'Family Fun Campground',
        type: 'Campground',
        location: {
          address: '1100 Family Lane',
          city: 'Orlando',
          state: 'FL',
          zipCode: '32801',
          coordinates: { lat: 28.5383, lng: -81.3792 },
        },
        amenities: [
          'Pool',
          'Playground',
          'Game Room',
          'WiFi',
          'Laundry',
          'Pet Friendly',
        ],
      },

      // Budget-Friendly Options
      {
        name: 'Pine Valley Basic Camp',
        type: 'Tent Camping',
        location: {
          address: '600 Pine Street',
          city: 'Flagstaff',
          state: 'AZ',
          zipCode: '86001',
          coordinates: { lat: 35.1983, lng: -111.6513 },
        },
        amenities: ['Fire Pits', 'Restrooms', 'Hiking', 'Pet Friendly'],
      },
    ];

    // Clear existing hosts first
    await prisma.host.deleteMany({});
    console.log('Cleared existing hosts...');

    for (const host of hosts) {
      try {
        await prisma.host.create({
          data: host,
        });
        created++;
      } catch (error) {
        errors.push(
          `Failed to create host ${host.name}: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    }

    console.log(`${created} hosts seeded successfully!`);
    console.log('Campsite types available:');
    const types = [...new Set(hosts.map((h) => h.type))];
    types.forEach((type) => console.log(`- ${type}`));

    return { created, skipped, errors };
  } catch (error) {
    console.error('Error seeding hosts:', error);
    return {
      created: 0,
      skipped: 0,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
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
