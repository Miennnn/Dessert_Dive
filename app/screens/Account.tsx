import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const Account: React.FC = () => {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    loadUsername();
  }, []);

  const loadUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error('Failed to load username from storage', error);
    }
  };

  const saveUsername = async () => {
    try {
      await AsyncStorage.setItem('username', username);
    } catch (error) {
      console.error('Failed to save username to storage', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>Account</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Save Username" onPress={saveUsername} />
      {username ? <ThemedText style={styles.username}>Username: {username}</ThemedText> : null}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    width: '80%',
  },
  username: {
    marginTop: 16,
    fontSize: 18,
  },
});

export default Account;