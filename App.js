import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/utils/firebase";

export default function App() {
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
