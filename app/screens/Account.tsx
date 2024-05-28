import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText} from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

function Account() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>Account</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Account;
