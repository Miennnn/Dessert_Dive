import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView, ImageBackground } from 'react-native';
import { FIRESTORE_DB } from '../../FirebaseConfig'; 
import { collection, getDocs } from "firebase/firestore"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const IngredientsList: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [allIngredients, setAllIngredients] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [isRecipeModalVisible, setIsRecipeModalVisible] = useState<boolean>(false);

  useEffect(() => {
    loadIngredients();
    fetchRecipes();
  }, []);

  const loadIngredients = async () => {
    const storedIngredients = await AsyncStorage.getItem('ingredients');
    if (storedIngredients !== null) {
      setIngredients(JSON.parse(storedIngredients));
    }
  };

  const fetchRecipes = async () => {
    console.log('Fetching recipes from Firestore...');
    const recipesCollection = collection(FIRESTORE_DB, 'Recipes');
    const recipesSnapshot = await getDocs(recipesCollection);
    const recipesData = recipesSnapshot.docs.map(doc => {
      console.log('Document data:', doc.data());
      return {
        id: doc.id,
        name: doc.data().Name,
        ingredients: doc.data().Ingredients,
        instructions: doc.data().Instructions
      };
    });
    console.log('Fetched recipes from Firestore:', recipesData); // Debug log
    setRecipes(recipesData);

    // Compile all ingredients from the recipes into a list with no duplicates
    const allIngredientsSet = new Set<string>();
    recipesData.forEach(recipe => {
      recipe.ingredients.forEach((ingredient: string) => {
        allIngredientsSet.add(ingredient);
      });
    });
    setAllIngredients(Array.from(allIngredientsSet));
  };

  const saveIngredients = async (newIngredients: string[]) => {
    await AsyncStorage.setItem('ingredients', JSON.stringify(newIngredients));
  };

  const handleIngredientSelect = (selectedIngredient: string) => {
    const newIngredients = [...ingredients, selectedIngredient];
    setIngredients(newIngredients);
    saveIngredients(newIngredients);
    setIsModalVisible(false);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    saveIngredients(newIngredients);
  };

  const handleRecipePress = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsRecipeModalVisible(true);
  };

  const closeRecipeModal = () => {
    setIsRecipeModalVisible(false);
    setSelectedRecipe(null);
  };

  const getAvailableRecipes = () => {
    if (ingredients.length === 0) {
      return [];
    }
    const availableRecipes = recipes.filter(recipe =>
      Array.isArray(recipe.ingredients) && ingredients.every(ingredient => recipe.ingredients.includes(ingredient))
    );
    console.log('Ingredients: ', ingredients);
    console.log('Filtered available recipes:', availableRecipes);
    return availableRecipes;
  };

  return (
    <ImageBackground source={require('../../assets/images/ingredient_background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Ingredients List</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Select an Ingredient:</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>↓</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={ingredients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.ingredientContainer}>
              <Text style={styles.ingredient}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveIngredient(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Text style={styles.subtitle}>Available Recipes:</Text>
        <FlatList
          data={getAvailableRecipes()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRecipePress(item)}>
              <View style={styles.recipeContainer}>
                <Text style={styles.recipe}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                {allIngredients.length > 0 ? (
                  allIngredients.map((ingredient, index) => (
                    <TouchableOpacity key={index} onPress={() => handleIngredientSelect(ingredient)} style={styles.modalItem}>
                      <Text style={styles.modalItemText}>{ingredient}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.noMoreIngredientsText}>No ingredients available</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
        {selectedRecipe && (
          <Modal
            visible={isRecipeModalVisible}
            animationType="slide"
            onRequestClose={closeRecipeModal}
          >
            <View style={styles.recipeModalContainer}>
              <Text style={styles.modalTitle}>{selectedRecipe.name}</Text>
              <Text style={styles.subTitle}>Ingredients:</Text>
              {selectedRecipe.ingredients.map((ingredient: string, index: number) => (
                <Text key={index} style={styles.ingredient}>{ingredient}</Text>
              ))}
              <Text style={styles.subTitle}>Instructions:</Text>
              {selectedRecipe.instructions.map((instruction: string, index: number) => (
                <Text key={index} style={styles.instruction}>{instruction}</Text>
              ))}
              <TouchableOpacity onPress={closeRecipeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  dropdownButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  dropdownButtonText: {
    fontSize: 20,
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ingredient: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  recipeContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recipe: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    maxHeight: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 10,
  },
  modalItemText: {
    fontSize: 18,
  },
  noMoreIngredientsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
  },
  recipeModalContainer: {
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
  closeButton: {
    backgroundColor: '#FF4444',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default IngredientsList;
