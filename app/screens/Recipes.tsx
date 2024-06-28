import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '@/FirebaseConfig'; 
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; 
import { FontAwesome } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    console.log('Fetching recipes from Firestore...');
    const recipesCollection = collection(FIRESTORE_DB, 'Recipes');
    const recipesSnapshot = await getDocs(recipesCollection);
    const recipesData = recipesSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().Name,
      ingredients: doc.data().Ingredients,
      instructions: doc.data().Instructions,
      isFavorite: doc.data().isFavorite || false, // Add a fallback for isFavorite
    }));
    console.log('Fetched recipes from Firestore:', recipesData); // Debug log
    setRecipes(recipesData);
  };

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const toggleFavorite = async (recipeId: string) => {
    const updatedRecipes = recipes.map(recipe => {
      if (recipe.id === recipeId) {
        const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
        updateFavoriteStatus(recipeId, updatedRecipe.isFavorite); // Update Firestore
        return updatedRecipe;
      }
      return recipe;
    });
    setRecipes(updatedRecipes);
  };

  const updateFavoriteStatus = async (recipeId: string, isFavorite: boolean) => {
    const recipeDocRef = doc(FIRESTORE_DB, 'Recipes', recipeId);
    await updateDoc(recipeDocRef, { isFavorite });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeItemContainer}>
            <TouchableOpacity style={styles.recipeItem} onPress={() => handleRecipePress(item)}>
              <Text style={styles.recipeName}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <FontAwesome
                name={item.isFavorite ? 'star' : 'star-o'}
                size={24}
                color={item.isFavorite ? 'gold' : 'gray'}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {selectedRecipe && (
        <View style={styles.details}>
          <Text style={styles.recipeTitle}>{selectedRecipe.name}</Text>
          <Text style={styles.subTitle}>Ingredients:</Text>
          {selectedRecipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>{ingredient}</Text>
          ))}
          <Text style={styles.subTitle}>Instructions:</Text>
          <Text style={styles.instructions}>{selectedRecipe.instructions}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFDDDD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recipeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recipeItem: {
    flex: 1,
  },
  recipeName: {
    fontSize: 18,
  },
  details: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  ingredient: {
    fontSize: 16,
  },
  instructions: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default Recipes;