import { View, Text, StyleSheet } from 'react-native';

export default function Likes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Likes ❤️</Text>
      <Text style={styles.subtitle}>See who has shown interest in you.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', paddingHorizontal: 40 },
});
