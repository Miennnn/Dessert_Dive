import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText} from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const Questionnaire: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [temperature, setTemperature] = useState('');
  const [flavor, setFlavor] = useState('');
  const [alcohol, setAlcohol] = useState('');

  const handleSubmit = () => {
    const preferences = { temperature, flavor, alcohol };
    navigation.navigate('Home', { preferences });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Dessert Preferences</ThemedText>

      <View style={styles.questionContainer}>
        <ThemedText style={styles.label}>Would you prefer the dessert to be hot or cold?</ThemedText>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, temperature === 'hot' && styles.selectedButton]}
            onPress={() => setTemperature('hot')}
          >
            <ThemedText style={styles.buttonText}>Hot</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, temperature === 'cold' && styles.selectedButton]}
            onPress={() => setTemperature('cold')}
          >
            <ThemedText style={styles.buttonText}>Cold</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <ThemedText style={styles.label}>Would you like it to be more sweet or savory?</ThemedText>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, flavor === 'sweet' && styles.selectedButton]}
            onPress={() => setFlavor('sweet')}
          >
            <ThemedText style={styles.buttonText}>Sweet</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, flavor === 'savory' && styles.selectedButton]}
            onPress={() => setFlavor('savory')}
          >
            <ThemedText style={styles.buttonText}>Savory</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <ThemedText style={styles.label}>Would you prefer it to be alcoholic or non-alcoholic?</ThemedText>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, alcohol === 'alcoholic' && styles.selectedButton]}
            onPress={() => setAlcohol('alcoholic')}
          >
            <ThemedText style={styles.buttonText}>Alcoholic</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, alcohol === 'non-alcoholic' && styles.selectedButton]}
            onPress={() => setAlcohol('non-alcoholic')}
          >
            <ThemedText style={styles.buttonText}>Non-alcoholic</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <ThemedText style={styles.submitButtonText}>Submit</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 16,
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
    marginHorizontal: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Questionnaire;
