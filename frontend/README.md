# GridSync Frontend

A modern React-based dashboard for energy management and electricity tokenization.

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Main layout with sidebar and header
│   ├── Sidebar.jsx         # Navigation sidebar component
│   ├── EnergyChart.jsx     # Energy usage visualization
│   └── Onboarding.jsx      # User onboarding flow
├── constants/
│   └── design.js           # Design system constants (colors, spacing, etc.)
├── services/
│   └── api.js              # API service functions
├── App.jsx                 # Main app component with routing
├── Dashboard.jsx           # Dashboard page component
├── WalletContext.jsx       # Wallet connection context
└── main.jsx               # App entry point
```

## Key Features

### Design System
- **Consistent Colors**: All colors are defined in `constants/design.js`
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Component-Based**: Modular components for easy maintenance

### Components

#### Layout.jsx
- Handles the overall application structure
- Includes sidebar navigation and header
- Manages page routing between different sections

#### Sidebar.jsx
- Navigation menu with icons
- User profile information
- Active page highlighting

#### Dashboard.jsx
- Key information cards (Meter ID, Balance, Available Power)
- Action cards (Buy Electricity, View History, Settings)
- Energy usage overview with chart

#### EnergyChart.jsx
- Simple bar chart for energy usage visualization
- Mock data for demonstration
- Responsive design

### Wallet Integration
- MetaMask connection
- Real-time balance updates
- Account change handling
- Persistent connection state

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to link MetaMask
2. **Complete Onboarding**: Fill in user details if first time
3. **Navigate**: Use sidebar to access different sections
4. **Monitor**: View energy usage and balance information

## Styling

The application uses Tailwind CSS with custom design constants:
- Colors are defined in `constants/design.js`
- Consistent spacing and typography
- Responsive breakpoints
- Hover and transition effects

## Development

To add new pages:
1. Create a new component in `components/`
2. Add navigation item to `Sidebar.jsx`
3. Add route handling in `Layout.jsx`
4. Update page title in header

## Data Flow

1. **WalletContext**: Manages wallet connection and user data
2. **API Service**: Handles backend communication
3. **Components**: Display data and handle user interactions
4. **Constants**: Provide consistent design values
