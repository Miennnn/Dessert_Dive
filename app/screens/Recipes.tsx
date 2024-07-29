import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal, Button, ScrollView, KeyboardAvoidingView, Platform, ImageBackground} from 'react-native';
import { FIRESTORE_DB } from '../../FirebaseConfig'; 
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; 
import { FontAwesome } from '@expo/vector-icons';

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  isFavorite: boolean;
}
const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [inputMinutes, setInputMinutes] = useState<string>('0');
  const [inputSeconds, setInputSeconds] = useState<string>('0');
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isEditingTime, setIsEditingTime] = useState<boolean>(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      clearInterval(interval);
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, remainingTime]);

  const fetchRecipes = async () => {
    console.log('Fetching recipes from Firestore...');
    const recipesCollection = collection(FIRESTORE_DB, 'Recipes');
    const recipesSnapshot = await getDocs(recipesCollection);
    const recipesData = recipesSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().Name,
      ingredients: doc.data().Ingredients,
      instructions: doc.data().Instructions.map((instruction: string) => ({ text: instruction, completed: false })),
      isFavorite: doc.data().isFavorite || false,
    }));
    console.log('Fetched recipes from Firestore:', recipesData); // Debug log
    setRecipes(recipesData);
    setFilteredRecipes(recipesData); // Set filtered recipes initially
  };

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalVisible(true);
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
    setFilteredRecipes(updatedRecipes); // Update filtered recipes
  };

  const updateFavoriteStatus = async (recipeId: string, isFavorite: boolean) => {
    const recipeDocRef = doc(FIRESTORE_DB, 'Recipes', recipeId);
    await updateDoc(recipeDocRef, { isFavorite });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  const toggleInstructionCompletion = (index: number) => {
    if (!selectedRecipe) return;
    const updatedInstructions = selectedRecipe.instructions.map((instruction, i) => {
      if (i === index) {
        return { ...instruction, completed: !instruction.completed };
      }
      return instruction;
    });
    setSelectedRecipe({ ...selectedRecipe, instructions: updatedInstructions });
  };

  const handleStartTimer = () => {
    const minutes = parseInt(inputMinutes) || 0;
    const seconds = parseInt(inputSeconds) || 0;
    const timeInSeconds = (minutes * 60) + seconds;
    setRemainingTime(timeInSeconds);
    setIsTimerRunning(true);
    setIsEditingTime(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRecipe(null);
    setIsTimerRunning(false);
    setRemainingTime(0);
    setInputMinutes('0');
    setInputSeconds('0');
    setIsEditingTime(false);
  };

  return (
    <ImageBackground source={require('../../assets/images/recipe_background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Recipes</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Recipes..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredRecipes}
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
          <Modal
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <ScrollView contentContainerStyle={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedRecipe.name}</Text>
              <Text style={styles.subTitle}>Ingredients:</Text>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredient}>{ingredient}</Text>
              ))}
              <Text style={styles.subTitle}>Instructions:</Text>
              {selectedRecipe.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionContainer}>
                  <TouchableOpacity 
                    style={[styles.checkbox, instruction.completed && styles.checkboxCompleted]}
                    onPress={() => toggleInstructionCompletion(index)}
                  />
                  <Text style={styles.instruction}>{instruction.text}</Text>
                </View>
              ))}
              <View style={styles.timerContainer}>
                <TextInput
                  style={styles.timerInput}
                  placeholder="Minutes"
                  keyboardType="numeric"
                  value={inputMinutes}
                  onFocus={() => setIsEditingTime(true)}
                  onChangeText={setInputMinutes}
                />
                <Text style={styles.timerLabel}>min</Text>
                <TextInput
                  style={styles.timerInput}
                  placeholder="Seconds"
                  keyboardType="numeric"
                  value={inputSeconds}
                  onFocus={() => setIsEditingTime(true)}
                  onChangeText={setInputSeconds}
                />
                <Text style={styles.timerLabel}>sec</Text>
                <Button title="Start Timer" onPress={handleStartTimer} />
              </View>
              <Text style={styles.timer}>Time remaining: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</Text>
              <Button title="Close" onPress={closeModal} />
            </ScrollView>
          </Modal>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0)', // Add transparency for the background image
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
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
  instructionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  checkboxCompleted: {
    backgroundColor: 'green',
  },
  instruction: {
    fontSize: 16,
    marginTop: 4,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 16,
  },
  timerInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  timerLabel: {
    marginRight: 8,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#FFDDDD',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default Recipes;