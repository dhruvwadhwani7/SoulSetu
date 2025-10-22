import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function Settings() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const [location, setLocation] = useState(true);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}></Text>

      {/* Notifications Toggle */}
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, { color: theme.text }]}>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          thumbColor={notifications ? theme.tint : '#ccc'}
        />
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, { color: theme.text }]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? theme.tint : '#ccc'}
        />
      </View>

      {/* Location Toggle */}
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, { color: theme.text }]}>Location Access</Text>
        <Switch
          value={location}
          onValueChange={setLocation}
          thumbColor={location ? theme.tint : '#ccc'}
        />
      </View>

      {/* Other Options */}
      <View style={styles.optionRow}>
        <Text style={[styles.optionLabel, { color: theme.text }]}>Account</Text>
      </View>
      <View style={styles.optionRow}>
        <Text style={[styles.optionLabel, { color: theme.text }]}>Privacy</Text>
      </View>
      <View style={styles.optionRow}>
        <Text style={[styles.optionLabel, { color: theme.text }]}>Help & Support</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  settingLabel: { fontSize: 16, fontWeight: '500' },
  optionRow: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  optionLabel: { fontSize: 16, fontWeight: '500' },
});
