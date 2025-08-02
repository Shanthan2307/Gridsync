# Smart Contract Integration Guide

## Overview

The GridSync frontend now integrates with deployed smart contracts on Sepolia testnet to provide automated energy credit purchasing with time and price-based conditions.

## Deployed Contracts

- **TimeHook**: `0x2f42F5A513226Ab166a43983D9F2e2522Cbb53d4`
  - Manages time-based restrictions for TWAP (Time-Weighted Average Price) orders
  - Ensures orders can only be executed once every 24 hours
  
- **PricePredicate**: `0x52A3B6AcFD2856885C050AC0913b0E67d355e4Be`
  - Handles price-based conditions for limit orders
  - Uses Chainlink price feeds to check if current price is below specified maximum

## How It Works

### 1. Wallet Connection
- Users must connect their MetaMask wallet to interact with smart contracts
- The system automatically detects if you're on Sepolia testnet

### 2. Order Creation Process
1. **Select Strategy**: Choose from Market Buy, Limit Order, DCA (TWAP), Grid Trading, or Momentum Strategy
2. **Enter Amount**: Specify the amount in ETH or USD
3. **Set Price Conditions** (for Limit Orders): Enter maximum price using real-time ETH/USD price from Chainlink
4. **Create Order**: The system will:
   - Generate a unique series ID
   - Register the order series with TimeHook contract
   - Check current price and time conditions
   - Display order status

### 3. Smart Contract Integration

#### TimeHook Contract
- **`registerOrderSeries(seriesId)`**: Registers a new order series for time tracking
- **`checkTime(seriesId)`**: Returns true if 24 hours have passed since last execution
- **`updateTimestamp(seriesId)`**: Updates the last execution time (called by 1inch LOP)

#### PricePredicate Contract
- **`checkPrice(oracleAddress, maxPrice)`**: Returns true if current price is below maxPrice
- Uses Chainlink ETH/USD price feed: `0x694AA1769357215DE4FAC081bf1f309aDC325306`

### 4. Order Status Monitoring
The system provides real-time status updates:
- **Time Condition**: Whether 24 hours have passed since last execution
- **Price Condition**: Whether current price meets limit order criteria
- **Can Execute**: Overall status combining both conditions
- **Last/Next Execution Times**: Timestamps for order tracking

## Supported Strategies

### Market Buy
- Immediate execution when conditions are met
- No price restrictions

### Limit Order
- Requires maximum price input
- Only executes when current price is below specified maximum
- Uses Chainlink price feed for real-time price validation

### Dollar Cost Average (TWAP)
- Time-based strategy using TimeHook contract
- Automatically spaces out purchases over time
- 24-hour intervals between executions

### Grid Trading
- Combines time and price conditions
- Creates multiple orders at different price levels

### Momentum Strategy
- Advanced strategy using both time and price predicates
- Adapts to market conditions

## Technical Details

### Contract Addresses
```javascript
const CONTRACT_ADDRESSES = {
  TIMEHOOK: '0x2f42F5A513226Ab166a43983D9F2e2522Cbb53d4',
  PRICE_PREDICATE: '0x52A3B6AcFD2856885C050AC0913b0E67d355e4Be'
};
```

### Chainlink Price Feeds
```javascript
const CHAINLINK_FEEDS = {
  ETH_USD: '0x694AA1769357215DE4FAC081bf1f309aDC325306', // Sepolia ETH/USD
  BTC_USD: '0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43', // Sepolia BTC/USD
};
```

### Key Functions

#### ContractService Class
- **`createEnergyCreditOrder(params)`**: Creates new order with smart contract integration
- **`getOrderStatus(seriesId, oracleAddress, maxPrice)`**: Gets current order status
- **`checkTime(seriesId)`**: Checks time condition
- **`checkPrice(oracleAddress, maxPrice)`**: Checks price condition

## Usage Instructions

1. **Connect Wallet**: Ensure MetaMask is connected to Sepolia testnet
2. **Select Strategy**: Choose your preferred buying strategy
3. **Enter Amount**: Specify the amount you want to invest
4. **Set Conditions**: For limit orders, enter maximum price
5. **Create Order**: Click "Buy Energy Credits" to create the order
6. **Monitor Status**: Use the order status panel to track execution conditions
7. **Refresh**: Click "Refresh" button to update order status

## Security Features

- **No Fund Custody**: Your funds never leave your wallet until execution
- **Permission-Based**: Uses standard ERC20 approve mechanism
- **Audited Contracts**: TimeHook and PricePredicate are designed for 1inch LOP integration
- **Real-Time Validation**: Uses Chainlink oracles for price verification

## Next Steps

This implementation provides the foundation for:
- Integration with 1inch Limit Order Protocol
- Automated order execution
- Advanced trading strategies
- Real-time market monitoring

The contracts are ready to be integrated with the 1inch LOP for actual order execution when market conditions are met. 