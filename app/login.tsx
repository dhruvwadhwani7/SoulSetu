import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  // ✅ Safe redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/main');
    }
  }, [isLoggedIn]);

  const handleSignIn = async () => {
    const success = await login(email.trim(), password.trim());
    if (success) {
      ToastAndroid.show('Login Successful 🎉', ToastAndroid.SHORT);
      router.replace('/main');
    } else {
      ToastAndroid.show('Invalid credentials. Try again.', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>Welcome to SoulSetu</Text>
        <Text style={[styles.subText, { color: theme.tint }]}>Sign in to continue</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, { borderColor: theme.tint }]}
          placeholder="Email"
          placeholderTextColor={theme.text + '88'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={[styles.input, { borderColor: theme.tint }]}
          placeholder="Password"
          placeholderTextColor={theme.text + '88'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <Button title="Sign In" color={theme.tint} onPress={handleSignIn} />
        </View>

        <Text style={[styles.infoText, { color: theme.text + '99' }]}>
          (Use dhruv@gmail.com / dhruv1234 to log in)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subText: {
    marginTop: 6,
    fontSize: 16,
    opacity: 0.8,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  infoText: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 13,
  },
});
