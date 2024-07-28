import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { collection, getDocs } from "firebase/firestore";

const Questionnaire: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [temperature, setTemperature] = useState('');
  const [flavor, setFlavor] = useState('');
  const [alcohol, setAlcohol] = useState('');
  const [recommendedRecipe, setRecommendedRecipe] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleSubmit = async () => {
    let recommendedDessert = '';

    if (temperature === 'cold' && flavor === 'sweet' && alcohol === 'non-alcoholic') {
      recommendedDessert = 'Strawberry Sorbet';
    } else if (temperature === 'cold' && flavor === 'sweet' && alcohol === 'alcoholic') {
      recommendedDessert = 'Boozy Ice Cream';
    } else if (temperature === 'cold' && flavor === 'savoury' && alcohol === 'non-alcoholic') {
      recommendedDessert = 'Gazpacho Sorbet';
    } else if (temperature === 'cold' && flavor === 'savoury' && alcohol === 'alcoholic') {
      recommendedDessert = 'Gin and Tonic';
    } else if (temperature === 'hot' && flavor === 'sweet' && alcohol === 'alcoholic') {
      recommendedDessert = 'Rum Baba';
    } else if (temperature === 'hot' && flavor === 'sweet' && alcohol === 'non-alcoholic') {
      recommendedDessert = 'Bread Pudding';
    } else if (temperature === 'hot' && flavor === 'savoury' && alcohol === 'non-alcoholic') {
      recommendedDessert = 'Molten Chocolate Cake';
    } else if (temperature === 'hot' && flavor === 'savoury' && alcohol === 'alcoholic') {
      recommendedDessert = 'Hot Toddy Bread Pudding';
    }

    if (recommendedDessert) {
      const recipe = await fetchRecipeFromFirebase(recommendedDessert);
      setRecommendedRecipe(recipe);
    }
  };

  const fetchRecipeFromFirebase = async (recipeName: string) => {
    console.log('Fetching recipe from Firestore...');
    const recipesCollection = collection(FIRESTORE_DB, 'Recipes');
    const recipesSnapshot = await getDocs(recipesCollection);
    const recipesData = recipesSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().Name,
      ingredients: doc.data().Ingredients,
      instructions: doc.data().Instructions
    }));
    const recipe = recipesData.find(recipe => recipe.name === recipeName);
    console.log('Fetched recipe from Firestore:', recipe); // Debug log
    return recipe;
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setRecommendedRecipe(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dessert Preferences</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.label}>Would you prefer the dessert to be hot or cold?</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, temperature === 'hot' && styles.selectedButton]}
            onPress={() => setTemperature('hot')}
          >
            <Text style={styles.buttonText}>Hot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, temperature === 'cold' && styles.selectedButton]}
            onPress={() => setTemperature('cold')}
          >
            <Text style={styles.buttonText}>Cold</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.label}>Would you like it to be more sweet or savory?</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, flavor === 'sweet' && styles.selectedButton]}
            onPress={() => setFlavor('sweet')}
          >
            <Text style={styles.buttonText}>Sweet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, flavor === 'savoury' && styles.selectedButton]}
            onPress={() => setFlavor('savoury')}
          >
            <Text style={styles.buttonText}>Savoury</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.label}>Would you prefer it to be alcoholic or non-alcoholic?</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, alcohol === 'alcoholic' && styles.selectedButton]}
            onPress={() => setAlcohol('alcoholic')}
          >
            <Text style={styles.buttonText}>Alcoholic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, alcohol === 'non-alcoholic' && styles.selectedButton]}
            onPress={() => setAlcohol('non-alcoholic')}
          >
            <Text style={styles.buttonText}>Non-alcoholic</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Recommend</Text>
      </TouchableOpacity>

      {recommendedRecipe && (
        <View style={styles.resultContainer}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text style={styles.label}>Recommended Dessert: <Text style={styles.boldText}>{recommendedRecipe.name}</Text></Text>
          </TouchableOpacity>
        </View>
      )}

      {recommendedRecipe && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>{recommendedRecipe.name}</Text>
            <Text style={styles.subTitle}>Ingredients:</Text>
            {recommendedRecipe.ingredients.map((ingredient: string, index: number) => (
              <Text key={index} style={styles.ingredient}>{ingredient}</Text>
            ))}
            <Text style={styles.subTitle}>Instructions:</Text>
            {recommendedRecipe.instructions.map((instruction: string, index: number) => (
              <Text key={index} style={styles.instruction}>{instruction}</Text>
            ))}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FFB6C1',
    borderColor: '#FFB6C1',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#FFB6C1',
    padding: 8,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'black',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    alignItems: 'center',
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
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
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
  boldText: {
    fontWeight: 'bold',
  },
});

export default Questionnaire;
