import { useColorScheme } from '@/hooks/use-color-scheme';
import { signInWithEmail, signInWithGoogle } from '@/lib/auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleEmailChange = (text: string) => setEmail(text);
  const handlePasswordChange = (text: string) => setPassword(text);

  const handleSignIn = async () => {
    try {
      await signInWithEmail(email, password);
      router.push('/home');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      router.push('/home');
    } catch (error) {
      console.error('Sign in with Google error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to SoulSetu</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.emailInput}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        <Button
          style={styles.signInButton}
          title="Sign In"
          onPress={handleSignIn}
        />
        <Button
          style={styles.signInWithGoogleButton}
          title="Sign In with Google"
          onPress={handleSignInWithGoogle}
        />
      </View>
    </View>
  );
};

export default LoginScreen;