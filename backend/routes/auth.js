const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Check if user exists by wallet address
router.post('/check-user', async (req, res) => {
  try {
    const { walletAddress } = req.body;
    
    if (!walletAddress) {
      return res.status(400).json({ 
        success: false, 
        message: 'Wallet address is required' 
      });
    }

    const user = await userService.getUserByWalletAddress(walletAddress);
    
    if (user) {
      // User exists, return user data
      return res.json({
        success: true,
        exists: true,
        user: {
          id: user.id,
          name: user.name,
          walletAddress: user.wallet_address,
          meterId: user.meter_id,
          balanceUsd: user.balance_usd,
          balanceWatts: user.balance_watts
        }
      });
    } else {
      // User doesn't exist, return onboarding status
      return res.json({
        success: true,
        exists: false
      });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Create new user (onboarding)
router.post('/onboard', async (req, res) => {
  try {
    const { name, walletAddress, meterId } = req.body;
    
    if (!name || !walletAddress || !meterId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, wallet address, and meter ID are required' 
      });
    }

    // Check if user already exists
    const existingUser = await userService.getUserByWalletAddress(walletAddress);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    // Create new user
    const newUser = await userService.createUser({
      name,
      walletAddress,
      meterId
    });

    res.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        walletAddress: newUser.wallet_address,
        meterId: newUser.meter_id,
        balanceUsd: newUser.balance_usd,
        balanceWatts: newUser.balance_watts
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Internal server error' 
    });
  }
});

// Get user data by wallet address
router.get('/user/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    const user = await userService.getUserByWalletAddress(walletAddress);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        walletAddress: user.wallet_address,
        meterId: user.meter_id,
        balanceUsd: user.balance_usd,
        balanceWatts: user.balance_watts
      }
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});



module.exports = router; 