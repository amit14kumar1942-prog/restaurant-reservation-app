export interface MenuItem {
  id: string;
  name: string;
  category: 'steaks' | 'seafood' | 'starters' | 'wines' | 'desserts';
  priceUSD: number;
  description: string;
  usdaGrade?: 'USDA Prime' | 'A5 Wagyu' | 'Wild Caught' | 'Grand Cru';
  dryAgedDays?: number;
  origin?: string;
  image: string;
  isPopular?: boolean;
}

export interface Reservation {
  id?: string;
  guestName: string;
  email: string;
  phone: string;
  location: 'Manhattan, NYC' | 'Beverly Hills, CA' | 'Miami Beach, FL' | 'Gold Coast, Chicago';
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Main Dining Hall' | 'Private Wine Cellar Vault' | "Chef's Counter" | 'Rooftop Terrace';
  specialRequests?: string;
  depositAmountUSD: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt?: string;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  isAnonymous: boolean;
}