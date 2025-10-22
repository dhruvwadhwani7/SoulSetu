import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Main() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const buttonFade = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current;
  const subtitleFade = useRef(new Animated.Value(0)).current;

  const doodles = useRef(
    new Array(18).fill(0).map(() => ({
      x: Math.random() * (width - 60),
      anim: new Animated.Value(Math.random() * 1),
      scale: 0.6 + Math.random() * 1.2,
      delay: Math.random() * 2000,
      size: 16 + Math.random() * 28,
      rotation: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    // Animate title
    Animated.spring(titleScale, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Animate subtitle
    Animated.timing(subtitleFade, {
      toValue: 1,
      duration: 1200,
      delay: 400,
      useNativeDriver: true,
    }).start();

    // Animate doodles
    doodles.forEach(d => {
      // Float animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(d.anim, {
            toValue: 1,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: true,
            delay: d.delay,
          }),
          Animated.timing(d.anim, {
            toValue: 0,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Rotation animation
      Animated.loop(
        Animated.timing(d.rotation, {
          toValue: 1,
          duration: 8000 + Math.random() * 4000,
          useNativeDriver: true,
        })
      ).start();
    });

    // Animate button
    Animated.timing(buttonFade, {
      toValue: 1,
      duration: 1500,
      delay: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Decorative circles in background */}
      <View style={[styles.circleDecor, styles.circle1, { backgroundColor: theme.tint + '08' }]} />
      <View style={[styles.circleDecor, styles.circle2, { backgroundColor: theme.tint + '05' }]} />
      <View style={[styles.circleDecor, styles.circle3, { backgroundColor: theme.tint + '06' }]} />

      {/* Floating doodles */}
      {doodles.map((d, i) => {
        const translateY = d.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -40 - Math.random() * 60],
        });
        const translateX = d.anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 15 - Math.random() * 30, 0],
        });
        const opacity = d.anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.3, 0.8, 0.3],
        });
        const rotate = d.rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });

        return (
          <Animated.View
            key={i}
            style={[
              styles.doodle,
              {
                left: d.x,
                transform: [
                  { translateY },
                  { translateX },
                  { scale: d.scale },
                  { rotate }
                ],
                opacity,
              },
            ]}
          >
            <IconSymbol name="heart.fill" size={d.size} color={theme.tint} />
          </Animated.View>
        );
      })}

      <View style={styles.center}>
        {/* Title with animation */}
        <Animated.View style={{ transform: [{ scale: titleScale }] }}>
          <Text style={[styles.title, { color: theme.text }]}>SOUL SETU</Text>
          <View style={[styles.titleUnderline, { backgroundColor: theme.tint }]} />
        </Animated.View>

        {/* Subtitle with fade */}
        <Animated.View style={{ opacity: subtitleFade }}>
          <Text style={[styles.subtitle, { color: theme.tint }]}>
            Connect • Vibe • Repeat
          </Text>
          <Text style={[styles.tagline, { color: theme.text }]}>
            Socializing Made Easy
          </Text>
        </Animated.View>

        {/* Button with fade and glow effect */}
        <Animated.View style={{ opacity: buttonFade, marginTop: 50 }}>
          <Pressable
            onPress={() => router.replace('../main')}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: theme.tint,
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <View style={[styles.buttonGlow, { backgroundColor: theme.tint }]} />
            <Text style={styles.buttonText}>Start Connecting</Text>
            <View style={styles.buttonShine} />
          </Pressable>

          {/* Feature tags */}
          <View style={styles.featureTags}>
            <View style={[styles.tag, { borderColor: theme.tint + '30', backgroundColor: theme.background }]}>
              <Text style={[styles.tagText, { color: theme.tint }]}>✨ AI Matching</Text>
            </View>
            <View style={[styles.tag, { borderColor: theme.tint + '30', backgroundColor: theme.background }]}>
              <Text style={[styles.tagText, { color: theme.tint }]}>🔒 Secure</Text>
            </View>
            <View style={[styles.tag, { borderColor: theme.tint + '30', backgroundColor: theme.background }]}>
              <Text style={[styles.tagText, { color: theme.tint }]}>💫 Real</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    position: 'relative',
  },
  circleDecor: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    width: 400,
    height: 400,
    top: -150,
    right: -100,
  },
  circle2: {
    width: 300,
    height: 300,
    bottom: -80,
    left: -80,
  },
  circle3: {
    width: 200,
    height: 200,
    top: '50%',
    right: -50,
  },
  doodle: { 
    position: 'absolute', 
    top: Math.random() * (height * 0.7), 
    width: 40, 
    height: 40,
  },
  center: { 
    position: 'absolute', 
    top: '38%', 
    left: 0, 
    right: 0, 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: { 
    fontSize: 52, 
    fontWeight: '900', 
    letterSpacing: 4, 
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  titleUnderline: {
    width: 80,
    height: 5,
    marginTop: 12,
    alignSelf: 'center',
    borderRadius: 3,
  },
  subtitle: { 
    marginTop: 20, 
    fontSize: 20, 
    fontWeight: '600', 
    letterSpacing: 3,
    textAlign: 'center',
  },
  tagline: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '400',
    opacity: 0.6,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: { 
    paddingVertical: 18, 
    paddingHorizontal: 50, 
    borderRadius: 30,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonGlow: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    bottom: -50,
    opacity: 0.3,
    borderRadius: 60,
  },
  buttonShine: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 50,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-20deg' }],
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 18, 
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  featureTags: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});