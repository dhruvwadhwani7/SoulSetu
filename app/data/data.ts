// data.ts
// for the main.tsx
export const stats = [
  { label: 'Profile Views', value: '127', icon: 'eye.fill', color: '#FF6B6B' },
  { label: 'New Matches', value: '12', icon: 'heart.fill', color: '#4ECDC4' },
  { label: 'Messages', value: '24', icon: 'message.fill', color: '#95E1D3' },
];

export const recentMatches = [
  { name: 'Sarah', age: 24, image: '👩', distance: '2 km away', match: 95 },
  { name: 'Emma', age: 26, image: '👱‍♀️', distance: '5 km away', match: 88 },
  { name: 'Olivia', age: 23, image: '🧑‍🦰', distance: '3 km away', match: 92 },
];

export const quickActions = [
  { title: 'Explore', icon: 'safari', route: 'explore', gradient: ['#FF6B6B', '#FF8E53'] },
  { title: 'Chat', icon: 'message.fill', route: 'chat', gradient: ['#4ECDC4', '#44A08D'] },
  { title: 'Likes', icon: 'heart.fill', route: 'likes', gradient: ['#F38181', '#FCE38A'] },
  { title: 'Profile', icon: 'person.fill', route: 'profile', gradient: ['#6A82FB', '#FC5C7D'] },
  { title: 'Settings', icon: 'gearshape.fill', route: 'settings', gradient: ['#6A82FB', '#FC5C7D'] },
];

export const recentActivity = [
  {
    icon: 'heart.fill',
    iconColor: '#4ECDC4',
    text: 'You matched with Sarah',
    time: '2 hours ago',
  },
  {
    icon: 'message.fill',
    iconColor: '#FF6B6B',
    text: 'New message from Emma',
    time: '5 hours ago',
  },
  {
    icon: 'eye.fill',
    iconColor: '#95E1D3',
    text: 'Olivia viewed your profile',
    time: '1 day ago',
  },
];

//for explore page
export const PROFILES = [
  {
    id: 1,
    name: 'Sarah',
    age: 26,
    bio: 'Adventure seeker | Coffee enthusiast ☕',
    location: 'New York, NY',
    distance: '3 miles away',
    job: 'Product Designer',
    education: 'NYU',
    interests: ['Photography', 'Travel', 'Yoga', 'Coffee'],
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
    ],
  },
  {
    id: 2,
    name: 'Emma',
    age: 24,
    bio: 'Foodie 🍕 | Dog mom 🐕',
    location: 'Brooklyn, NY',
    distance: '5 miles away',
    job: 'Marketing Manager',
    education: 'Columbia',
    interests: ['Cooking', 'Dogs', 'Music', 'Art'],
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop',
    ],
  },
  {
    id: 3,
    name: 'Jessica',
    age: 28,
    bio: 'Yoga instructor 🧘‍♀️ | Plant lover 🌿',
    location: 'Manhattan, NY',
    distance: '2 miles away',
    job: 'Yoga Instructor',
    education: 'Boston University',
    interests: ['Yoga', 'Meditation', 'Nature', 'Reading'],
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop',
    ],
  },
  {
    id: 4,
    name: 'Olivia',
    age: 25,
    bio: 'Artist at heart 🎨 | Vintage lover',
    location: 'Queens, NY',
    distance: '4 miles away',
    job: 'Graphic Designer',
    education: 'Parsons',
    interests: ['Art', 'Fashion', 'Brunch', 'Photography'],
    photos: [
      'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop',
    ],
  },
  {
    id: 5,
    name: 'Sophia',
    age: 27,
    bio: 'Tech enthusiast 💻 | Gym regular 💪',
    location: 'Hoboken, NJ',
    distance: '6 miles away',
    job: 'Software Engineer',
    education: 'MIT',
    interests: ['Technology', 'Fitness', 'Travel', 'Gaming'],
    photos: [
      'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=600&fit=crop',
    ],
  },
];