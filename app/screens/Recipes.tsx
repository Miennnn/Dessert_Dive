import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText} from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

function Recipes() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>Recipes</ThemedText>
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

export default Recipes;
