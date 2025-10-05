# CampLots - Camping Site Booking Platform

A full-stack camping site booking application built with Next.js, Express.js, and PostgreSQL.

## 🏕️ Features

- **User Authentication**: JWT-based login/register system with password reset
- **Host Management**: Browse and view camping site details
- **Booking System**: Make reservations with payment integration
- **Protected Routes**: Secure access to booking and dashboard features
- **Responsive Design**: Mobile-first responsive UI
- **Real-time Updates**: Dynamic booking status and availability

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
camplots-app/
├── packages/
│   ├── frontend/          # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/       # Next.js App Router pages
│   │   │   ├── components/ # Reusable React components
│   │   │   ├── lib/       # Utilities and API client
│   │   │   └── store/     # Redux store and slices
│   │   └── package.json
│   └── backend/           # Express.js backend API
│       ├── src/
│       │   ├── controllers/ # Request handlers
│       │   ├── routes/     # API routes
│       │   ├── middlewares/ # Custom middleware
│       │   └── services/   # Business logic
│       └── package.json
├── prisma/               # Database schema and migrations
├── generated/           # Generated Prisma client
└── package.json        # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd camplots-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env` files in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/camplots"

   # JWT Secret
   JWT_SECRET="your-super-secret-jwt-key"

   # Frontend API URL (for production)
   NEXT_PUBLIC_API_URL="http://localhost:8000"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # Seed the database (optional)
   npm run seed --workspace=backend
   ```

5. **Start the development servers**

   ```bash
   # Start backend (runs on port 8000)
   npm run dev:backend

   # Start frontend (runs on port 3000)
   npm run dev:frontend
   ```

### Test Account

- **Email**: test@example.com
- **Password**: password123

## 📝 Available Scripts

### Root Level

- `npm run dev:frontend` - Start frontend development server
- `npm run dev:backend` - Start backend development server
- `npm run build:frontend` - Build frontend for production
- `npm run build:backend` - Build backend for production

### Frontend Package

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend Package

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample data

## 🔐 Authentication

The application uses JWT-based authentication with:

- Protected routes for authenticated users
- Password hashing with bcryptjs
- Token persistence in localStorage
- Automatic token validation and refresh

## 🎯 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/users/profile` - Get user profile

### Hosts

- `GET /api/hosts` - Get all hosts
- `GET /api/hosts/:id` - Get host by ID
- `POST /api/hosts` - Create new host
- `PUT /api/hosts/:id` - Update host
- `DELETE /api/hosts/:id` - Delete host

### Bookings

- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)

1. Connect your GitHub repository
2. Set environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_SECRET`: JWT signing secret
   - `PORT`: Application port (usually auto-set)
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@camplots.com or join our Slack channel.

---

Built with ❤️ by the CampLots team
