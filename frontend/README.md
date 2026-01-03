# 📱 GlobeTrotter – Frontend (React Native)

This directory contains the **mobile application** for GlobeTrotter, built using **React Native with Expo**. The app runs on both Android and iOS platforms and communicates with the backend via REST APIs.

---

## 🎯 Responsibilities

The frontend handles:
- User authentication
- Trip and itinerary management
- Budget visualization
- Activity discovery
- Community interaction
- AI-powered travel planning UI

---

## 🛠️ Tech Stack

- React Native (Expo)
- TypeScript
- React Navigation
- Axios
- AsyncStorage
- Context API & Hooks

---

## 📂 Folder Structure

```
src/
├── api/ # API clients & services
├── components/ # Reusable UI components
├── screens/ # App screens
├── navigation/ # Navigation setup
├── contexts/ # Global state
├── hooks/ # Custom hooks
└── constants/ # Theme & configuration
```

---


---

## 🚀 Getting Started

### 1. Navigate to frontend
```bash
cd frontend/expo
```

### 2. Install dependencies
```bash
npm install
```
### 3. Configure API URL

Edit src/api/endpoints.ts:
```bash
const API_URL = 'http://localhost:3000/api';
```

### 4. Start Expo
```bash
npm start
```
### 5. Run on device
- Scan QR using Expo Go
- Press a for Android emulator
- Press i for iOS simulator
---

## 🔐 Authentication Flow

- User logs in  
- JWT token is stored in **AsyncStorage**  
- Axios interceptor attaches the token to every API request  
- Token expiration is handled automatically  

---

## 🧪 Testing
```bash
npm test
```

---

## 📦 Build for Production
### Android
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

---

## 📄 Notes
- Backend must be running before using the app
- Ensure the correct IP address is used when running on physical devices

---

