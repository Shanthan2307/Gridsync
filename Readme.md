# Gridsync - Decentralized Energy Access Platform

Gridsync is a full-stack application that leverages DeFi principles to solve real-world energy challenges in East Africa, making electricity access seamless, programmable, and inclusive.

## Features

### Frontend (React + Vite)
- **Wallet Integration**: Seamless MetaMask connection using ethers.js
- **Persistent Connection**: Wallet connection state persists across sessions
- **User Onboarding**: New users can select and connect to smart meters
- **Dashboard**: Real-time meter balance and energy consumption display
- **Energy Flow Simulation**: Interactive diagram showing energy flow process

### Backend (Node.js + SQLite)
- **User Management**: Store user profiles with wallet addresses and meter IDs
- **Meter Management**: Track meter balances in USD and kWh
- **RESTful API**: Complete API for user authentication and data management
- **Database**: SQLite database with users and meters tables

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- ethers.js (v6)
- Chart.js

### Backend
- Node.js
- Express.js
- SQLite3
- CORS

## Project Structure

```
Gridsync/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   ├── App.jsx          # Main app component
│   │   ├── Dashboard.jsx    # Dashboard for connected users
│   │   ├── Onboarding.jsx   # User onboarding component
│   │   ├── WalletContext.jsx # Wallet state management
│   │   └── diagram.jsx      # Energy flow simulation
│   └── package.json
├── backend/                  # Node.js backend application
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── database.js          # Database setup and helpers
│   ├── server.js            # Express server
│   └── package.json
└── README.md
```

## Database Schema

### Users Table
- `id` (INTEGER PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `wallet_address` (TEXT UNIQUE NOT NULL)
- `meter_id` (TEXT UNIQUE)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

### Meters Table
- `id` (INTEGER PRIMARY KEY)
- `meter_id` (TEXT UNIQUE NOT NULL)
- `balance_usd` (REAL DEFAULT 0.0)
- `balance_watts` (REAL DEFAULT 0.0)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MetaMask browser extension

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5174`

## API Endpoints

### Authentication
- `POST /api/auth/check-user` - Check if user exists by wallet address
- `POST /api/auth/onboard` - Create new user account
- `GET /api/auth/user/:walletAddress` - Get user data by wallet address

### Health Check
- `GET /api/health` - Backend health status

## User Flow

1. **Connect Wallet**: User connects their MetaMask wallet
2. **User Check**: System checks if wallet address exists in database
3. **Onboarding** (if new user): User enters their meter ID and completes profile
4. **Dashboard**: User sees their meter balance and energy consumption
5. **Energy Flow**: Interactive simulation shows energy flow process

## Sample Data

The application comes with sample data:
- **Users**: John Doe (METER001), Jane Smith (METER002)
- **Meters**: Created automatically when users register with their meter IDs

## Development

### Backend Development
- The backend uses SQLite for simplicity
- Database is automatically initialized with sample data
- All API responses follow a consistent format with `success` and `message` fields

### Frontend Development
- Uses React Context for global state management
- Wallet connection state persists across page refreshes
- Responsive design with Tailwind CSS

## Future Enhancements

- Smart contract integration for tokenized electricity
- Real-time meter data updates
- Transaction history and analytics
- Mobile app development
- Integration with real utility providers

## License

This project is for educational and demonstration purposes.
