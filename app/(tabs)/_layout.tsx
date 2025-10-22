import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="likes" options={{ title: 'Likes', tabBarIcon: () => <IconSymbol name="heart.fill" size={22} /> }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat', tabBarIcon: () => <IconSymbol name="message.fill" size={22} /> }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: () => <IconSymbol name="safari" size={22} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: () => <IconSymbol name="person.crop.circle" size={22} /> }} />
      <Tabs.Screen 
  name="settings" 
  options={{ 
    title: 'Settings', 
    tabBarIcon: () => <IconSymbol name="gearshape" size={22} /> 
  }} 
/>
    </Tabs>
  );
}
