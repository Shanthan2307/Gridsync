# GridSync - Decentralized Automated Electricity Top-Up System

GridSync is a decentralized, automated electricity top-up system designed for prepaid energy markets like those in Kenya and other developing regions. It eliminates the outdated, manual process of entering long tokens into physical meters and replaces it with a smart, Web3-powered solution that leverages real-time electricity pricing and decentralized trading strategies.

## The Problem

In many parts of the world, consumers must prepay for electricity and manually enter 20-digit tokens into meters. This system is time-consuming, prone to errors, and blind to market fluctuations.

## Our Solution

GridSync automates this process by:
1. **Direct Payment Integration** - Linking payments directly to meter IDs, automatically crediting electricity without manual input
2. **Web3 Trading Integration** - Using 1inch's Limit Order Protocol to allow users to trade for electricity when prices are favorable
3. **Smart Execution** - Automatically executing trades when conditions are met (e.g., lower electricity rates at night)
4. **Instant Delivery** - Electricity tokens are instantly credited to the user's meter with no manual input required

## How It Works

1. **Payment**: User pays using fiat or crypto via a simple interface
2. **Limit Order Setup**: System creates a limit order using 1inch's Limit Order Protocol, waiting for favorable prices
3. **Execution**: Smart contract automatically executes the trade when conditions are met
4. **Credit Delivery**: Electricity token is instantly credited to the user's meter

## Benefits

- **Consumers** save money by buying electricity at off-peak hours
- **Utility companies** benefit from smoother demand management
- **Scalable** across any country with prepaid meter systems

## Technology Stack

### Frontend
- React + Vite
- MetaMask integration with ethers.js v6
- Dashboard with real-time meter balances and energy consumption

### Backend
- Node.js + Express + SQLite3
- RESTful APIs for user authentication and onboarding
- Service layer for database operations

### Web3 Integration
- 1inch Limit Order Protocol for decentralized trading
- Smart contract architecture for automated execution
- Mock energy pricing for testing and demonstration

## Project Structure

```
Gridsync/
├── frontend/                 # React frontend application
├── backend/                  # Node.js backend application
├── contracts/               # Smart contracts
└── README.md
```

## Quick Start

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:3001`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## API Endpoints

- `POST /api/auth/check-user` - Check if user exists by wallet address
- `POST /api/auth/onboard` - Create new user account
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order

## User Flow

1. Connect MetaMask wallet
2. Complete onboarding with meter ID
3. View dashboard with meter balance and consumption
4. Set price thresholds for automated electricity purchases

## What's Next

- Smart contract deployment for tokenized electricity
- Direct 1inch Protocol integration
- Chainlink oracles for real-time energy prices
- Mobile app for field usage
- Integration with actual utility providers

## License

This project is for educational and demonstration purposes, showcasing the potential of Web3 technology in solving real-world energy access challenges.

