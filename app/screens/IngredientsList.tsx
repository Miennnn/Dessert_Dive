// app/screens/DessertsNearMe.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IngredientsList: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const allPredefinedIngredients = ['Baking Powder', 'Baking Soda', 'Bread', 'Butter', 'Chocolate', 'Cinnamon', 'Cornstarch', 
  'Cucumber', 'Egg', 'Eggs', 'Flour', 'Garlic', 'Gin', 'Heavy cream', 'Honey', 'Lemon juice', 
  'Lime juice', 'Milk', 'Nutmeg', 'Olive oil', 'Onion', 'Red bell pepper', 'Rum', 'Salt', 
  'Strawberry', 'Sugar', 'Tonic water', 'Tomato juice', 'Vanilla Extract', 'Yeast'];
  
  const recipes = [
    {
      name: 'Rum Baba',
      ingredients: ['Flour', 'Sugar', 'Salt', 'Yeast', 'Milk', 'Eggs', 'Butter', 'Rum']
    },
    {
      name: 'Bread Pudding',
      ingredients: ['Bread', 'Milk', 'Butter', 'Sugar', 'Vanilla Extract', 'Cinnamon', 'Salt']
    },
    {
      name: 'Molten Chocolate Cake',
      ingredients: ['Butter', 'Chocolate', 'Egg', 'Sugar', 'Flour']
    },
    {
      name: 'Hot Toddy Bread Pudding',
      ingredients: ['Bread', 'Milk', 'Butter', 'Sugar', 'Egg', 'Vanilla Extract', 'Bourbon', 'Nutmeg', 'Salt']
    },
    {
      name: 'Savory Gin and Tonic Sorbet',
      ingredients: ['Tonic water', 'Gin', 'Sugar', 'Lime juice', 'Cucumber']
    },
    {
      name: 'Gazpacho Sorbet',
      ingredients: ['Tomato juice', 'Cucumber', 'Red bell pepper', 'Onion', 'Olive oil', 'Lemon juice', 'Garlic', 'Salt']
    },
    {
      name: 'Boozy Ice Cream',
      ingredients: ['Heavy cream', 'Milk', 'Sugar', 'Bourbon', 'Rum', 'Vanilla extract']
    },
    {
      name: 'Strawberry Pudding',
      ingredients: ['Strawberry', 'Sugar', 'Milk', 'Cornstarch', 'Vanilla extract']
    }
  ];

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      const storedIngredients = await AsyncStorage.getItem('ingredients');
      if (storedIngredients !== null) {
        setIngredients(JSON.parse(storedIngredients));
      }
    } catch (error) {
      console.error('Failed to load ingredients from storage', error);
    }
  };

  const saveIngredients = async (newIngredients: string[]) => {
    try {
      await AsyncStorage.setItem('ingredients', JSON.stringify(newIngredients));
    } catch (error) {
      console.error('Failed to save ingredients to storage', error);
    }
  };

  const handlePredefinedIngredientSelect = (selectedIngredient: string) => {
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

  const filteredPredefinedIngredients = allPredefinedIngredients.filter(
    (ingredient) => !ingredients.includes(ingredient)
  );

  const getAvailableRecipes = () => {
    if (ingredients.length === 0) {
      return [];
    }
    return recipes.filter(recipe => 
      ingredients.every(ingredient => recipe.ingredients.includes(ingredient))
    );
  };

  return (
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeContainer}>
            <Text style={styles.recipe}>{item.name}</Text>
          </View>
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
              {filteredPredefinedIngredients.length > 0 ? (
                filteredPredefinedIngredients.map((ingredient, index) => (
                  <TouchableOpacity key={index} onPress={() => handlePredefinedIngredientSelect(ingredient)} style={styles.modalItem}>
                    <Text style={styles.modalItemText}>{ingredient}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noMoreIngredientsText}>No more ingredients available</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
});

export default IngredientsList;