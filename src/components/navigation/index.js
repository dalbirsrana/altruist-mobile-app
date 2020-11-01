import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import { ActivityIndicator, StyleSheet, Text, View, TextInput } from "react-native";


export default function Providers() {
  return (
      <AuthProvider>
          <Routes />
      </AuthProvider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});