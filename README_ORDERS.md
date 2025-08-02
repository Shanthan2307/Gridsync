# Orders System Documentation

## Overview

The GridSync application now includes a comprehensive orders system that tracks pending and executed orders for energy credit purchases. The system supports various order types including TWAP (Time-Weighted Average Price), Market Buy, Limit Orders, Grid Trading, and Momentum Strategy.

## Database Schema

### Orders Table

The `orders` table stores all order information with the following fields:

- `id`: Primary key
- `user_address`: Wallet address of the user
- `order_type`: Type of order (TWAP, MARKET, LIMIT, GRID, MOMENTUM)
- `strategy`: Human-readable strategy name
- `sell_amount`: Amount being sold
- `sell_currency`: Currency being sold (USDC, ETH)
- `buy_amount_estimated`: Estimated amount to be bought
- `buy_currency`: Currency to be bought (ETH, USD)
- `max_price`: Maximum price for limit orders
- `schedule_day`: Day number for scheduled orders (TWAP)
- `status`: Order status (PENDING, ACTIVE, FILLED, CANCELLED)
- `series_id`: Smart contract series ID
- `time_condition_met`: Boolean for time condition
- `price_condition_met`: Boolean for price condition
- `can_execute`: Boolean indicating if order can be executed
- `last_execution_time`: Timestamp of last execution
- `next_execution_time`: Timestamp of next execution
- `execution_count`: Number of times executed
- `total_executed_amount`: Total amount executed
- `created_at`: Order creation timestamp
- `updated_at`: Last update timestamp
- `executed_at`: Execution timestamp

## API Endpoints

### Backend Routes (`/api/orders`)

1. **GET `/api/orders/user/:address`** - Get all orders for a user
   - Query params: `status` (optional) - filter by status
   
2. **POST `/api/orders`** - Create a new order
   - Body: Order data object
   
3. **PUT `/api/orders/:id/status`** - Update order status
   - Body: Status update data
   
4. **GET `/api/orders/:id`** - Get specific order
   
5. **DELETE `/api/orders/:id`** - Delete order

## Frontend Components

### Activity Component (`frontend/src/components/Activity.jsx`)

The Activity component displays order activity with two main sections:

1. **Pending Orders Tab**: Shows orders that are PENDING or ACTIVE
2. **Executed Orders Tab**: Shows orders that have been FILLED

Features:
- Tab navigation between pending and executed orders
- Status badges with color coding
- Responsive table design
- Loading states
- Empty state handling

### Buy Component Integration

The Buy component now automatically saves orders to the database when created through the smart contract interface.

## Order Types

### TWAP (Time-Weighted Average Price)
- **Description**: Dollar Cost Averaging strategy that spreads purchases over time
- **Schedule**: Daily execution over multiple days
- **Status Flow**: PENDING → ACTIVE → FILLED

### Market Buy
- **Description**: Immediate purchase at current market price
- **Execution**: Instant
- **Status Flow**: PENDING → FILLED

### Limit Order
- **Description**: Purchase only when price reaches specified maximum
- **Condition**: Price-based execution
- **Status Flow**: PENDING → FILLED (when conditions met)

### Grid Trading
- **Description**: Automated trading based on grid price levels
- **Execution**: Multiple orders at different price points
- **Status Flow**: PENDING → ACTIVE → FILLED

### Momentum Strategy
- **Description**: Trading based on price momentum indicators
- **Execution**: Algorithmic timing
- **Status Flow**: PENDING → ACTIVE → FILLED

## Status Definitions

- **PENDING**: Order created but not yet active
- **ACTIVE**: Order is currently being processed/executed
- **FILLED**: Order has been successfully executed
- **CANCELLED**: Order was cancelled by user or system

## Setup Instructions

### 1. Database Setup
The orders table is automatically created when the backend starts. No manual setup required.

### 2. Seed Sample Data
To populate the database with sample orders for testing:

```bash
cd backend
npm run seed
```

### 3. Start the Application
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

## Usage

1. **Create Orders**: Use the Buy component to create new orders
2. **View Activity**: Navigate to the Activity component to see order status
3. **Track Progress**: Monitor pending orders and view execution history
4. **Status Updates**: Orders automatically update status based on smart contract events

## Integration with Smart Contracts

The orders system integrates with the existing smart contract infrastructure:

- Orders are created through the `ContractService`
- Status updates are synchronized with blockchain events
- Series IDs link database records to smart contract series
- Price feeds from Chainlink are used for limit order validation

## Error Handling

- Database connection errors are logged but don't prevent order creation
- API failures fall back to mock data for demonstration
- Smart contract errors are displayed to users
- Network issues are handled gracefully with retry logic

## Future Enhancements

- Real-time order status updates via WebSocket
- Order cancellation functionality
- Advanced filtering and search
- Export order history
- Order templates for common strategies
- Performance analytics and reporting 