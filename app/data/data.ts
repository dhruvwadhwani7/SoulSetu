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
