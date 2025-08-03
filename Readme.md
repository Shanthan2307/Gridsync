# GridSync - Decentralized Automated Electricity Top-Up System

GridSync is a decentralized, automated electricity top-up system designed for prepaid energy markets like those in Kenya and other developing regions. It eliminates the outdated, manual process of entering long tokens into physical meters and replaces it with a smart, Web3-powered solution that leverages real-time electricity pricing and decentralized trading strategies.

## The Problem GridSync Solves

In many parts of the world, consumers are required to prepay for electricity. After paying, they receive a 20-digit token, which must be manually entered into a meter to activate the credit. This system is:

- **Time-consuming** - Manual entry of 20-digit tokens
- **Prone to user error** - Typos can result in lost payments
- **Blind to market fluctuations** - No awareness of electricity price variations

## Our Solution: Automation + Smart Trading via Web3

GridSync automates this process and adds financial intelligence by:

1. **Direct Payment Integration** - Linking payments directly to meter IDs, automatically crediting electricity without manual input
2. **Web3 Trading Integration** - Using 1inch's Limit Order Protocol to allow users to trade for electricity when prices are favorable
3. **Smart Execution** - Automatically executing trades when conditions are met (e.g., lower electricity rates at night)
4. **Instant Delivery** - Electricity tokens are instantly credited to the user's meter with no manual input required

## Why 1inch Limit Order Protocol?

- **Asynchronous execution** - Users don't need to monitor prices in real-time
- **Gas-efficient design** - Orders only execute under favorable conditions
- **Custom strategies** - Support for TWAP, DCA, and conditional orders
- **Secure and decentralized** - Reduces reliance on centralized energy brokers

## Use Cases & Benefits

- **Consumers** save money by buying electricity at off-peak hours
- **Utility companies** benefit from smoother demand management
- **Energy traders or NGOs** can optimize energy allocation in real-time
- **Scalable** across any country with prepaid meter systems

## How GridSync Works

1. **Payment**: The user pays using fiat or crypto via a simple interface
2. **Limit Order Setup**: The system creates a limit order using the 1inch Limit Order Protocol, waiting to buy electricity credits until the price drops to a user-defined or algorithmically calculated threshold
3. **Execution**: When the order conditions are met (e.g., lower electricity rates at night), the smart contract automatically executes the trade
4. **Credit Delivery**: The electricity token is instantly credited to the user's meter using a backend integration, with no manual input required

## Technology Stack

### Frontend (React + Vite + Ethers.js)
- **React 19** and **Vite** for fast development and hot reloads
- **MetaMask integration** using ethers.js v6 for wallet-based user identity and transactions
- **Intuitive onboarding flow** where users enter their meter ID and link it to their wallet
- **Dashboard component** showing real-time meter balances, energy consumption, and simulated top-up states
- **Energy flow simulation** using SVG and state transitions to visualize the GridSync process

### Backend (Node.js + Express + SQLite3)
- **RESTful APIs** for wallet-based user authentication and onboarding
- **SQLite** for lightweight, file-based local storage of users and meters
- **Service layer** to abstract database logic and keep route handlers clean
- **Health checks**, user lookup, and dynamic response messaging

### Web3 & Protocol Integration (1inch Limit Order Protocol)
- **DeFi-based trading layer** that simulates limit orders via a pseudo-price oracle
- **Dynamic electricity rates** with wallet-connected inputs for user-defined price thresholds
- **Architecture preparation** for 1inch's Limit Order smart contracts integration
- **Mock energy pricing** for testing dynamic behavior without live smart meters

## Database Design

- **Two tables**: `users` and `meters` - normalized and connected via `meter_id`
- **Dual-unit storage**: Balances stored in both USD and Watts
- **Audit trails**: `created_at` and `updated_at` fields for transaction histories

## API Design & Development Workflow

- **Modular architecture**: Separated routes and services for scalability
- **Standardized responses**: All APIs follow `{ success, message, data }` format
- **Mock endpoints**: Simulated energy pricing and balance top-up flows for testing
- **Health monitoring**: Comprehensive backend health checks

## Project Structure

```
Gridsync/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # React components (Activity, Buy, EnergyChart, etc.)
│   │   ├── services/         # API and contract services
│   │   ├── constants/        # Contract addresses and design constants
│   │   ├── App.jsx          # Main app component
│   │   ├── Dashboard.jsx    # Dashboard for connected users
│   │   ├── Onboarding.jsx   # User onboarding component
│   │   ├── WalletContext.jsx # Wallet state management
│   │   └── Diagram.jsx      # Energy flow simulation
│   └── package.json
├── backend/                  # Node.js backend application
│   ├── routes/              # API routes (auth, orders)
│   ├── services/            # Business logic services
│   ├── database.js          # Database setup and helpers
│   ├── server.js            # Express server
│   └── package.json
├── contracts/               # Smart contracts
│   ├── GridTradingHook.sol  # Grid trading hook contract
│   ├── Hybrid_Strategy.sol  # Hybrid trading strategy
│   └── Lock.sol            # Basic lock contract
└── README.md
```

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

The frontend will run on `http://localhost:5173`


## API Endpoints

### Authentication
- `POST /api/auth/check-user` - Check if user exists by wallet address
- `POST /api/auth/onboard` - Create new user account
- `GET /api/auth/user/:walletAddress` - Get user data by wallet address

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order

### Health Check
- `GET /api/health` - Backend health status

## User Flow

1. **Connect Wallet**: User connects their MetaMask wallet
2. **User Check**: System checks if wallet address exists in database
3. **Onboarding** (if new user): User enters their meter ID and completes profile
4. **Dashboard**: User sees their meter balance and energy consumption
5. **Energy Flow**: Interactive simulation shows energy flow process
6. **Trading**: Users can set price thresholds for automated electricity purchases

## What's Next: DeFi Integration Pipeline

We're preparing to extend GridSync into a true decentralized application by:

- **Smart Contract Deployment** - Minting electricity tokens and integrating with real meters
- **1inch Protocol Integration** - Direct on-chain execution of cost-efficient top-ups
- **Chainlink Oracles** - Tracking actual energy prices and fulfilling limit orders automatically
- **Fiat-to-Crypto Onboarding** - Through providers like Transak or Ramp
- **Mobile-First UI** - For field usage in energy-limited regions

## Development Notes

### Current Implementation
- **Educational focus**: Current build is primarily centralized for learning purposes
- **Mock components**: Simulated energy pricing and trading for demonstration
- **Scalable architecture**: Designed to easily integrate with real smart contracts

### Future Enhancements
- Real-time meter data integration
- Smart contract deployment and testing
- Mobile application development
- Integration with actual utility providers
- Advanced trading strategies and analytics

## License

