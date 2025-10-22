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

  const doodles = useRef(
    new Array(12).fill(0).map(() => ({
      x: Math.random() * (width - 40),
      anim: new Animated.Value(Math.random() * 1),
      scale: 0.8 + Math.random() * 0.8,
      delay: Math.random() * 1000,
      size: 14 + Math.random() * 22,
    }))
  ).current;

  useEffect(() => {
    doodles.forEach(d => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(d.anim, {
            toValue: 1,
            duration: 2000 + Math.random() * 1500,
            useNativeDriver: true,
            delay: d.delay,
          }),
          Animated.timing(d.anim, {
            toValue: 0,
            duration: 2000 + Math.random() * 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    Animated.timing(buttonFade, {
      toValue: 1,
      duration: 2000,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {doodles.map((d, i) => {
        const translateY = d.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20 - Math.random() * 40],
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
            <IconSymbol name="heart.fill" size={d.size} color={theme.tint} />
          </Animated.View>
        );
      })}

      <View style={styles.center}>
        <Text style={[styles.title, { color: theme.text }]}>SOUL SETU</Text>
        <Text style={[styles.subtitle, { color: theme.tint }]}>
          Connect • Vibe • Repeat
        </Text>

        <Animated.View style={{ opacity: buttonFade, marginTop: 40 }}>
          <Pressable
            onPress={() => router.replace('../main')}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? theme.tint + 'CC' : theme.tint,
                shadowColor: theme.tint,
              },
            ]}
          >
            <Text style={styles.buttonText}>Start Connecting</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  doodle: { position: 'absolute', top: Math.random() * (height * 0.6), width: 30, height: 30 },
  center: { position: 'absolute', top: '40%', left: 0, right: 0, alignItems: 'center' },
  title: { fontSize: 38, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase' },
  subtitle: { marginTop: 8, fontSize: 18, fontWeight: '500', opacity: 0.8 },
  button: { paddingVertical: 14, paddingHorizontal: 42, borderRadius: 28, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 4 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16, letterSpacing: 0.5 },
});
