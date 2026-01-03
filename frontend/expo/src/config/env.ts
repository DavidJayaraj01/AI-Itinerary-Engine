export const ENV = {
  // API Configuration
  API_URL: __DEV__ 
    ? 'http://10.0.2.2:3000/api'  // Android Emulator (use 10.0.2.2)
    : 'https://your-production-api.com/api',
  
  // For iOS Simulator, use: http://localhost:3000/api
  // For Physical Device, use: http://YOUR_LOCAL_IP:3000/api (e.g., http://192.168.1.100:3000/api)
  
  // App Configuration
  APP_NAME: 'Itinerary Engine',
  VERSION: '1.0.0',
  
  // Storage Keys
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'access_token',
    USER_DATA: 'user_data',
    REFRESH_TOKEN: 'refresh_token',
  },
};

export default ENV;
