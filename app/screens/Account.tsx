import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
      <Text style={styles.text}>Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Save Username" onPress={saveUsername} />
      {username ? <Text style={styles.username}>Username: <Text style={styles.boldText}>{username}</Text></Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFDDDD',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2, 
    paddingHorizontal: 8,
    marginBottom: 16,
    width: '80%',
  },
  username: {
    marginTop: 16,
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Account;
