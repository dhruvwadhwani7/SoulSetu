import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { stats, recentMatches, quickActions, recentActivity } from '@/app/data/data';

const { width } = Dimensions.get('window');

export default function HomeDashboard() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View 
        style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        <View>
          <Text style={[styles.greeting, { color: theme.text }]}>Hello, Dhruv! 👋</Text>
          <Text style={[styles.subGreeting, { color: theme.text + '80' }]}>
            Welcome back to Soul Setu
          </Text>
        </View>
        <Pressable style={[styles.notificationBtn, { backgroundColor: theme.tint + '15' }]}>
          <IconSymbol name="bell.fill" size={22} color={theme.tint} />
          <View style={[styles.badge, { backgroundColor: '#FF6B6B' }]} />
        </Pressable>
      </Animated.View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <Animated.View
            key={stat.label}
            style={[styles.statCard, { 
              backgroundColor: theme.tint + '12',
              opacity: fadeAnim,
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, 30 + index * 10],
                })
              }]
            }]}
          >
            <View style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}>
              <IconSymbol name={stat.icon} size={24} color={stat.color} />
            </View>
            <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.text + '80' }]}>{stat.label}</Text>
          </Animated.View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
  <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
  
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false} 
    contentContainerStyle={{ gap: 12 }}
  >
    {quickActions.map((action) => (
      <Pressable
        key={action.title}
        style={({ pressed }) => [
          styles.quickActionCard,
          { 
            backgroundColor: theme.tint + '15',
            transform: [{ scale: pressed ? 0.95 : 1 }]
          }
        ]}
        onPress={() => router.push(`/(tabs)/${action.route}`)}
      >
        <View style={[styles.quickActionIcon, { backgroundColor: theme.tint + '25' }]}>
          <IconSymbol name={action.icon} size={28} color={theme.tint} />
        </View>
        <Text style={[styles.quickActionText, { color: theme.text }]}>{action.title}</Text>
      </Pressable>
    ))}
  </ScrollView>
</View>

      {/* Recent Matches */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Matches</Text>
          <Pressable onPress={() => router.push('/(tabs)/explore')}>
            <Text style={[styles.seeAll, { color: theme.tint }]}>See All →</Text>
          </Pressable>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentMatches.map((match, index) => (
            <Pressable key={index} style={[styles.matchCard, { backgroundColor: theme.tint + '12' }]}>
              <View style={styles.matchImageContainer}>
                <Text style={styles.matchImage}>{match.image}</Text>
                <View style={[styles.matchBadge, { backgroundColor: '#4ECDC4' }]}>
                  <Text style={styles.matchPercent}>{match.match}%</Text>
                </View>
              </View>
              <View style={styles.matchInfo}>
                <Text style={[styles.matchName, { color: theme.text }]}>{match.name}, {match.age}</Text>
                <View style={styles.matchLocation}>
                  <IconSymbol name="location.fill" size={12} color={theme.tint} />
                  <Text style={[styles.matchDistance, { color: theme.text + '80' }]}>{match.distance}</Text>
                </View>
              </View>
              <Pressable style={[styles.matchButton, { backgroundColor: theme.tint }]}>
                <IconSymbol name="heart.fill" size={16} color="#fff" />
              </Pressable>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Recent Activity */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Activity</Text>
        {recentActivity.map((activity, idx) => (
          <View key={idx} style={[styles.activityCard, { backgroundColor: theme.tint + '08' }]}>
            <View style={[styles.activityIcon, { backgroundColor: activity.iconColor + '30' }]}>
              <IconSymbol name={activity.icon} size={20} color={activity.iconColor} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.text }]}>{activity.text}</Text>
              <Text style={[styles.activityTime, { color: theme.text + '60' }]}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 15,
    fontWeight: '500',
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  lastSection: {
    marginBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '700',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  matchCard: {
    width: 160,
    borderRadius: 20,
    padding: 16,
    marginRight: 12,
  },
  matchImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 12,
  },
  matchImage: {
    fontSize: 64,
  },
  matchBadge: {
    position: 'absolute',
    top: 0,
    right: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchPercent: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  matchInfo: {
    marginBottom: 12,
  },
  matchName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  matchLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  matchDistance: {
    fontSize: 12,
    fontWeight: '500',
  },
  matchButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  activityCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 13,
    fontWeight: '500',
  },
});