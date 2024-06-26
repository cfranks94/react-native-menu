import 'react-native-url-polyfill/auto';
// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return AsyncStorage.getItem(key);
    // return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    AsyncStorage.setItem(key, value);
    // SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    AsyncStorage.removeItem(key);
    // SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://enoxrkcrortubfowkokn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVub3hya2Nyb3J0dWJmb3drb2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2NDkxMTAsImV4cCI6MjAyOTIyNTExMH0.NMElWfALtgNg5HRBkNng0IsFD4w_MXkDPlzY42j0sDY';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});