# THE ESTATE PRIME & RESERVE - React + TypeScript + Firebase Web App

An ultra-luxury US Flagship Steakhouse & Fine Dining Web Platform built with React 18, TypeScript, Tailwind CSS, and Firebase integration.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase
Copy `.env.example` to `.env` and fill in your Firebase credentials:
```bash
cp .env.example .env
```

Or configure Firebase interactively directly inside the application under the **Firebase Setup** tab!

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 📁 Folder Structure
```
├── src/
│   ├── components/      # UI components (Header, Footer, Navigation)
│   ├── config/          # Firebase initialization & configuration
│   ├── hooks/           # React hooks (Firebase Auth, custom logic)
│   ├── pages/           # Application views (Home, Menu, Reservations, Firebase Setup)
│   ├── services/        # Firestore database API handlers
│   ├── types/           # TypeScript interfaces & types
│   ├── App.tsx          # Main Root Component with tab routing
│   ├── index.css        # Tailwind CSS imports & global styles
│   └── main.tsx         # React App Entry Point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```
