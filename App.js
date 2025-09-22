import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MainScreen from './src/screens/MainScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#f8f9fa" />
      <MainScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
