import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';

const Questionnaire: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [temperature, setTemperature] = useState('');
  const [flavor, setFlavor] = useState('');
  const [alcohol, setAlcohol] = useState('');
  const [dessert, setDessert] = useState('');

  const handleSubmit = () => {
    let recommendedDessert = '';

    if (temperature === 'cold' && flavor === 'sweet' && alcohol === 'non-alcoholic') {
      recommendedDessert = 'Strawberry Sorbet';
    } else if (temperature === 'cold' && flavor === 'sweet' && alcohol === 'alcoholic') {
      recommendedDessert = 'Boozy Ice Cream';
    } else if (temperature === 'cold' && flavor === 'savoury' && alcohol === 'non-alcoholic') {
      recommendedDessert = 'Gazpacho Sorbet';
    } else if (temperature === 'cold' && flavor === 'savoury' && alcohol === 'alcoholic') {
      recommendedDessert = 'Savory Gin and Tonic Sorbet';
    } else if (temperature === 'hot' && flavor === 'sweet' && alcohol === 'alcoholic') {
      recommendedDessert = 'Rum Baba';
    } else if (temperature === 'hot' && flavor === 'sweet' && alcohol === 'non-alcoholic') {
      recommendedDessert = 'Bread Pudding';
    } else if (temperature === 'hot' && flavor === 'savoury' && alcohol === 'non-alcoholic') {
      recommendedDessert = 'Molten Chocolate Cake';
    } else if (temperature === 'hot' && flavor === 'savoury' && alcohol === 'alcoholic') {
      recommendedDessert = 'Hot Toddy Bread Pudding';
    }

    setDessert(recommendedDessert);
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
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {dessert ? (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Recommended Dessert: {dessert}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFDDDD ', 
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    color: 'black', 
  },
  questionContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: 'black', 
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
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
  },
});

export default Questionnaire;
