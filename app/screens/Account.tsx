import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { FontAwesome } from '@expo/vector-icons'; 

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  isFavorite: boolean;
}

const Account: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    loadProfileData();
    fetchFavoriteRecipes();
  }, []);

  const loadProfileData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedDescription = await AsyncStorage.getItem('description');
      if (storedUsername) {
        setUsername(storedUsername);
      }
      if (storedDescription) {
        setDescription(storedDescription);
      }
    } catch (error) {
      console.error('Failed to load profile data from storage', error);
    }
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('description', description);
    } catch (error) {
      console.error('Failed to save profile data to storage', error);
    }
    setIsEditing(false);
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
    console.log('Fetched favorite recipes from Firestore:', recipesData); 
    setFavoriteRecipes(recipesData);
  };

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRecipe(null);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <ImageBackground source={require('../../assets/images/account_background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Enter your description"
                value={description}
                onChangeText={setDescription}
                multiline
              />
              <Button title="Save" onPress={saveProfileData} />
            </>
          ) : (
            <>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.description}>{description}</Text>
              <TouchableOpacity onPress={toggleEditing} style={styles.editButton}>
                <FontAwesome name="edit" size={24} color="black" />
              </TouchableOpacity>
            </>
          )}
        </View>
        <Text style={styles.subTitle}>Favorite Recipes:</Text>
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRecipePress(item)}>
              <View style={styles.recipeItemContainer}>
                <Text style={styles.recipeName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No favorite recipes</Text>}
        />

        {selectedRecipe && (
          <Modal
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedRecipe.name}</Text>
              <Text style={styles.subTitle}>Ingredients:</Text>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredient}>{ingredient}</Text>
              ))}
              <Text style={styles.subTitle}>Instructions:</Text>
              {selectedRecipe.instructions.map((instruction, index) => (
                <Text key={index} style={styles.instruction}>{instruction}</Text>
              ))}
              <Button title="Close" onPress={closeModal} />
            </View>
          </Modal>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0)', // Add transparency for the background image
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 70,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: -100,
    padding: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFDDDD',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Account;