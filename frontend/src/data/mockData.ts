export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  image: string;
  type: 'lost' | 'found';
  status: 'lost' | 'found' | 'returned';
  contactEmail?: string;
}

export const categories = [
  { name: 'Phones', icon: 'Smartphone', count: 24 },
  { name: 'Wallets', icon: 'Wallet', count: 18 },
  { name: 'Keys', icon: 'Key', count: 31 },
  { name: 'Bags', icon: 'Briefcase', count: 12 },
  { name: 'Documents', icon: 'FileText', count: 9 },
];

export const mockItems: Item[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    description: 'Space black iPhone 15 Pro Max with a clear case. Lost near the central park fountain area. Has a small scratch on the back.',
    category: 'Phones',
    location: 'Central Park, NYC',
    date: '2026-03-14',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',
    type: 'lost',
    status: 'lost',
  },
  {
    id: '2',
    title: 'Brown Leather Wallet',
    description: 'A premium brown leather wallet containing several cards. Found on a bench near the subway station.',
    category: 'Wallets',
    location: 'Times Square Station',
    date: '2026-03-13',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop',
    type: 'found',
    status: 'found',
  },
  {
    id: '3',
    title: 'Car Keys with Tesla Fob',
    description: 'Tesla Model 3 key fob with a leather keychain. Lost somewhere in the mall parking lot.',
    category: 'Keys',
    location: 'Westfield Mall',
    date: '2026-03-12',
    image: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?w=400&h=300&fit=crop',
    type: 'lost',
    status: 'lost',
  },
  {
    id: '4',
    title: 'Blue Backpack',
    description: 'Navy blue Herschel backpack with laptop and notebooks inside. Left at a coffee shop.',
    category: 'Bags',
    location: 'Starbucks, 5th Ave',
    date: '2026-03-11',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    type: 'found',
    status: 'found',
  },
  {
    id: '5',
    title: 'Passport — US',
    description: 'US passport found in a taxi. Name partially visible. Please contact to verify identity.',
    category: 'Documents',
    location: 'Yellow Cab, Manhattan',
    date: '2026-03-10',
    image: 'https://images.unsplash.com/photo-1544991875-5dc1b05f607d?w=400&h=300&fit=crop',
    type: 'found',
    status: 'found',
  },
  {
    id: '6',
    title: 'AirPods Pro 2nd Gen',
    description: 'White AirPods Pro in the charging case. Lost during morning jog along the riverside trail.',
    category: 'Phones',
    location: 'Hudson River Trail',
    date: '2026-03-09',
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop',
    type: 'lost',
    status: 'lost',
  },
  {
    id: '7',
    title: 'Silver Watch — Rolex',
    description: 'Found a silver Rolex Submariner on the gym floor. Stored safely at the front desk.',
    category: 'Wallets',
    location: 'Equinox Gym, SoHo',
    date: '2026-03-08',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
    type: 'found',
    status: 'returned',
  },
  {
    id: '8',
    title: 'House Keys with Red Tag',
    description: 'Set of 3 house keys on a red keyring tag. Lost somewhere between the library and parking lot.',
    category: 'Keys',
    location: 'Public Library, Brooklyn',
    date: '2026-03-07',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=300&fit=crop',
    type: 'lost',
    status: 'lost',
  },
];

export const userItems: Item[] = [
  mockItems[0],
  mockItems[2],
  mockItems[5],
  mockItems[7],
];
