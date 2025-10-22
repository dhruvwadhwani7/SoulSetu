import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/context/AuthContext';

const { width, height } = Dimensions.get('window');

export default function MainScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { isLoggedIn } = useAuth();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const doodles = useRef(
    new Array(10).fill(0).map(() => ({
      x: Math.random() * (width - 40),
      anim: new Animated.Value(Math.random() * 1),
      delay: Math.random() * 1000,
      size: 18 + Math.random() * 20,
      scale: 0.7 + Math.random() * 0.6,
    }))
  ).current;

  // Animations
  useEffect(() => {
    doodles.forEach((d) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(d.anim, {
            toValue: 1,
            duration: 2000 + Math.random() * 1000,
            delay: d.delay,
            useNativeDriver: true,
          }),
          Animated.timing(d.anim, {
            toValue: 0,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      ToastAndroid.show('Please log in first', ToastAndroid.SHORT);
      router.replace('/login');
    }
  }, [isLoggedIn]);

  const handleProtectedPress = (route: string) => {
    if (!isLoggedIn) {
      ToastAndroid.show('Please log in first', ToastAndroid.SHORT);
      router.replace('/login');
      return;
    }
    router.push(route);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: theme.background, opacity: fadeAnim },
      ]}
    >
      {/* Floating doodles */}
      {doodles.map((d, i) => {
        const translateY = d.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -25 - Math.random() * 25],
        });
        const opacity = d.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        });

        return (
          <Animated.View
            key={i}
            style={[
              styles.doodle,
              {
                left: d.x,
                transform: [{ translateY }, { scale: d.scale }],
                opacity,
              },
            ]}
          >
            <IconSymbol
              name={i % 2 === 0 ? 'heart.fill' : 'sparkles'}
              size={d.size}
              color={theme.tint}
            />
          </Animated.View>
        );
      })}

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>SoulSetu</Text>
        <Pressable onPress={() => handleProtectedPress('/(tabs)/profile')}>
          <IconSymbol name="person.crop.circle" size={32} color={theme.tint} />
        </Pressable>
      </View>

      {/* Main content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.welcome, { color: theme.text }]}>Welcome Back!</Text>
        <Text style={[styles.subtitle, { color: theme.tint }]}>
          Connect • Chat • Explore ❤️
        </Text>

        <View style={styles.cardContainer}>
          {/* Explore */}
          <View style={[styles.card, { backgroundColor: theme.tint + '15' }]}>
            <IconSymbol name="safari" size={36} color={theme.tint} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Explore Matches
            </Text>
            <Text style={[styles.cardText, { color: theme.text + '99' }]}>
              Find people who vibe with your soul.
            </Text>
            <Pressable
              style={[styles.cardButton, { backgroundColor: theme.tint }]}
              onPress={() => handleProtectedPress('/(tabs)/explore')}
            >
              <Text style={styles.cardButtonText}>Explore</Text>
            </Pressable>
          </View>

          {/* Chat */}
          <View style={[styles.card, { backgroundColor: theme.tint + '15' }]}>
            <IconSymbol name="message.fill" size={36} color={theme.tint} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Chats
            </Text>
            <Text style={[styles.cardText, { color: theme.text + '99' }]}>
              Start conversations that matter.
            </Text>
            <Pressable
              style={[styles.cardButton, { backgroundColor: theme.tint }]}
              onPress={() => handleProtectedPress('/(tabs)/chat')}
            >
              <Text style={styles.cardButtonText}>Open Chats</Text>
            </Pressable>
          </View>

          {/* Likes */}
          <View style={[styles.card, { backgroundColor: theme.tint + '15' }]}>
            <IconSymbol name="heart.fill" size={36} color={theme.tint} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>Likes</Text>
            <Text style={[styles.cardText, { color: theme.text + '99' }]}>
              See who’s liked your profile.
            </Text>
            <Pressable
              style={[styles.cardButton, { backgroundColor: theme.tint }]}
              onPress={() => handleProtectedPress('/(tabs)/likes')}
            >
              <Text style={styles.cardButtonText}>View Likes</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  doodle: {
    position: 'absolute',
    top: Math.random() * (height * 0.7),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 1,
  },
  content: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 80,
  },
  welcome: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 6,
    opacity: 0.8,
  },
  cardContainer: {
    marginTop: 30,
    width: '90%',
    gap: 20,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  cardText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  cardButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
