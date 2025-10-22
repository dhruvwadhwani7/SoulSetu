import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ToastAndroid,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;

  const floatingHearts = useRef(
    new Array(8).fill(0).map(() => ({
      x: Math.random() * (width - 40),
      anim: new Animated.Value(Math.random() * 1),
      scale: 0.5 + Math.random() * 0.7,
      delay: Math.random() * 1500,
      size: 14 + Math.random() * 18,
    }))
  ).current;

  // ✅ Safe redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/main');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // Animate logo
    Animated.spring(logoScale, {
      toValue: 1,
      tension: 15,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Animate form
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate floating hearts
    floatingHearts.forEach(heart => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(heart.anim, {
            toValue: 1,
            duration: 2500 + Math.random() * 1500,
            useNativeDriver: true,
            delay: heart.delay,
          }),
          Animated.timing(heart.anim, {
            toValue: 0,
            duration: 2500 + Math.random() * 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

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
      {/* Decorative background circles */}
      <View style={[styles.circleDecor, styles.circle1, { backgroundColor: theme.tint + '08' }]} />
      <View style={[styles.circleDecor, styles.circle2, { backgroundColor: theme.tint + '06' }]} />

      {/* Floating hearts background */}
      {floatingHearts.map((heart, i) => {
        const translateY = heart.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30 - Math.random() * 40],
        });
        const opacity = heart.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.2, 0.6],
        });
        return (
          <Animated.View
            key={i}
            style={[
              styles.floatingHeart,
              {
                left: heart.x,
                top: Math.random() * height * 0.8,
                transform: [{ translateY }, { scale: heart.scale }],
                opacity,
              },
            ]}
          >
            <IconSymbol name="heart.fill" size={heart.size} color={theme.tint} />
          </Animated.View>
        );
      })}

      {/* Logo/Header Section */}
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: logoScale }] }}>
          <View style={[styles.logoContainer, { backgroundColor: theme.tint + '15' }]}>
            <IconSymbol name="heart.circle.fill" size={64} color={theme.tint} />
          </View>
        </Animated.View>
        
        <Text style={[styles.headerText, { color: theme.text }]}>Welcome Back</Text>
        <Text style={[styles.subText, { color: theme.tint }]}>Sign in to continue your journey</Text>
      </View>

      {/* Form Section */}
      <Animated.View 
        style={[
          styles.formContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <View style={[styles.card, { backgroundColor: theme.background, shadowColor: theme.tint }]}>
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <View style={[styles.inputIconContainer, { backgroundColor: theme.tint + '10' }]}>
                <IconSymbol name="envelope.fill" size={20} color={theme.tint} />
              </View>
              <TextInput
                style={[styles.input, { color: theme.text, borderColor: theme.tint + '30' }]}
                placeholder="Email"
                placeholderTextColor={theme.text + '60'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <View style={[styles.inputIconContainer, { backgroundColor: theme.tint + '10' }]}>
                <IconSymbol name="lock.fill" size={20} color={theme.tint} />
              </View>
              <TextInput
                style={[styles.input, { color: theme.text, borderColor: theme.tint + '30' }]}
                placeholder="Password"
                placeholderTextColor={theme.text + '60'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Sign In Button */}
            <Pressable
              onPress={handleSignIn}
              style={({ pressed }) => [
                styles.button,
                { 
                  backgroundColor: theme.tint,
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              <Text style={styles.buttonText}>Sign In</Text>
              <View style={styles.buttonIcon}>
                <IconSymbol name="arrow.right" size={18} color="#fff" />
              </View>
            </Pressable>

            {/* Demo Credentials */}
            <View style={[styles.demoCard, { backgroundColor: theme.tint + '08', borderColor: theme.tint + '20' }]}>
              <IconSymbol name="info.circle.fill" size={16} color={theme.tint} />
              <Text style={[styles.demoText, { color: theme.text }]}>
                Demo: dhruv@gmail.com / dhruv1234
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.text + '80' }]}>
            New to Soul Setu?
          </Text>
          <Pressable>
            <Text style={[styles.footerLink, { color: theme.tint }]}>Create Account</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  circleDecor: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    width: 350,
    height: 350,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 250,
    height: 250,
    bottom: -80,
    left: -80,
  },
  floatingHeart: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
  },
  formContainer: {
    flex: 1,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  form: {
    gap: 20,
  },
  inputWrapper: {
    position: 'relative',
  },
  inputIconContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    zIndex: 1,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 14,
    paddingLeft: 60,
    paddingRight: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 14,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 6,
  },
  demoText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 24,
  },
  footerText: {
    fontSize: 15,
    fontWeight: '500',
  },
  footerLink: {
    fontSize: 15,
    fontWeight: '700',
  },
});