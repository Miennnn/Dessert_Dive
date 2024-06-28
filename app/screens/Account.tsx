import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIRESTORE_DB } from '@/FirebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { FontAwesome } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

const Account: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    loadUsername();
    fetchFavoriteRecipes();
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

  const fetchFavoriteRecipes = async () => {
    console.log('Fetching favorite recipes from Firestore...');
    const recipesCollection = collection(FIRESTORE_DB, 'Recipes');
    const q = query(recipesCollection, where('isFavorite', '==', true));
    const recipesSnapshot = await getDocs(q);
    const recipesData = recipesSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().Name,
      ingredients: doc.data().Ingredients,
      instructions: doc.data().Instructions,
      isFavorite: doc.data().isFavorite || false,
    }));
    console.log('Fetched favorite recipes from Firestore:', recipesData); // Debug log
    setFavoriteRecipes(recipesData);
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
      <Text style={styles.subTitle}>Favorite Recipes:</Text>
      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeItemContainer}>
            <Text style={styles.recipeName}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No favorite recipes</Text>}
      />
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
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  recipeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  recipeName: {
    fontSize: 18,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Account;