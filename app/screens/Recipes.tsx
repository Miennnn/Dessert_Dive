// app/screens/DessertsNearMe.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
};

const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Pepper'],
    instructions: '1. Cook spaghetti. 2. Mix eggs and cheese. 3. Fry pancetta. 4. Combine all with pepper.',
  },
  {
    id: 2,
    name: 'Chicken Curry',
    ingredients: ['Chicken', 'Curry powder', 'Coconut milk', 'Onion', 'Garlic', 'Ginger'],
    instructions: '1. Sauté onion, garlic, and ginger. 2. Add chicken and curry powder. 3. Add coconut milk and simmer.',
  },
  {
    id: 3,
    name: 'Chocolate Cake',
    ingredients: ['Flour', 'Sugar', 'Cocoa powder', 'Baking powder', 'Eggs', 'Milk', 'Butter'],
    instructions: '1. Mix dry ingredients. 2. Add wet ingredients. 3. Bake at 350°F for 30 minutes.',
  },
];

const Recipes: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recipeItem} onPress={() => handleRecipePress(item)}>
            <Text style={styles.recipeName}>{item.name}</Text>
          </TouchableOpacity>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recipeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
