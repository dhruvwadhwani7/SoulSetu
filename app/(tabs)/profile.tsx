import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

export default function Profile() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile 👤</Text>
      <Text style={styles.subtitle}>Manage your details and preferences.</Text>
      <View style={styles.btnContainer}>
        <Button title="Logout" color="#ff4d4d" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', paddingHorizontal: 40 },
  btnContainer: { marginTop: 20 },
});
