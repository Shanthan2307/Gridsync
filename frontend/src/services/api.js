const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  // Check if user exists by wallet address
  async checkUser(walletAddress) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to check user');
      }

      return data;
    } catch (error) {
      console.error('Error checking user:', error);
      throw error;
    }
  }

  // Create new user (onboarding)
  async onboardUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/onboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to onboard user');
      }

      return data;
    } catch (error) {
      console.error('Error onboarding user:', error);
      throw error;
    }
  }

  // Get user data by wallet address
  async getUserData(walletAddress) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/user/${walletAddress}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user data');
      }

      return data;
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  }



  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Backend health check failed');
      }

      return data;
    } catch (error) {
      console.error('Error checking backend health:', error);
      throw error;
    }
  }
}

export default new ApiService(); 