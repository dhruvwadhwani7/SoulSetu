import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://zvfxrmuizigdjedqstiz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZnhybXVpemlnZGplZHFzdGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MTMzMTIsImV4cCI6MjA3NjQ4OTMxMn0.7cUJnNbfHNjimn0EYVcOMmY9uP7STaHpUP1DwmdFDXw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
