# AssetPanda 🏢💻

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open-green?style=for-the-badge)](https://asset-panda-rahul-khan-suvo.netlify.app/)

<div align="center">
  <img height="100%" src="https://i.ibb.co.com/27S3T8sv/screely-1738737444430.png"  />
</div>

## Project Overview
AssetPanda is a web-based platform designed to help manage assets within a company, track employee asset requests, and provide a smooth experience for both employees and administrators.

### 🔑 HR Login Credentials
- **Username**: hr@gmail.com  
- **Password**: 123456  

### 🚀 Features
- 📊 **Asset Management**: Track company assets, their status, and locations.
- 🔄 **Employee Asset Requests**: Employees can request assets, and HR can approve or reject them.
- 👤 **Employee Profiles**: Manage profiles, view assets, and track requests.
- 🛠 **Admin Dashboard**: Approve/reject requests, view details, and manage assets.
- 🔍 **Search & Filter**: Search assets by name, filter by status (approved, pending, returned).
- 📑 **Pagination**: Improved load times with paginated asset views.
- 📦 **Asset Return**: Return assets and track the return process.
- 📝 **PDF Export**: Download asset details for record-keeping.
- 🔐 **User Authentication**: Secure login via email or Google sign-in.
- 📱 **Responsive Design**: Optimized for mobile and desktop use.

### 🛠 Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, Google OAuth
- **Deployment**: Vercel (Frontend), Heroku (Backend)

### 🛠 Local Setup Guide

#### **Prerequisites**
- Node.js ≥16.x
- MongoDB Atlas account
- Firebase project

#### **1️⃣ Clone Repository**
```bash
git clone https://github.com/RahulKhanSuvo/assetpanda.git
cd assetpanda
```

## 2️⃣ Install Dependencies

### Client
```bash
cd client
npm install
```

### Server
```bash
cd ../server
npm install
```

## 3️⃣ Configure Environment Variables

Create `.env` files inside both the client and server directories.

### Client `.env`
```ini
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
```

### Server `.env`
```ini
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```
Replace all `your-...` values with actual credentials.

## 4️⃣ Start the Application

### Run Backend
```bash
cd server
npm start
```
This starts the backend server at `http://localhost:5000/`.

### Run Frontend
Open a new terminal, then:
```bash
cd client
npm start
```
This starts the frontend at `http://localhost:3000/`. 
