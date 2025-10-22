import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { signInWithEmail, signInWithGoogle } from '@/lib/auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      await signInWithEmail(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const onGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.brand, { color: theme.text }]}>SOUL SETU</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={theme.secondary}
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={theme.secondary}
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={[styles.button, { backgroundColor: theme.tint }]} onPress={onLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>

        <Pressable onPress={onGoogleLogin}>
          <Text style={[styles.link, { color: theme.tint }]}>Continue with Google</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  brand: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    gap: 12,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  button: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: { color: '#fff', fontWeight: '700' },
  link: {
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '600',
  },
  googleButton: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
