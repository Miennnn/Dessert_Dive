// app/screens/DessertsNearMe.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const IngredientsList: React.FC = () => {
  const [ingredient, setIngredient] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleInputChange = (text: string) => {
    setIngredient(text);
  };

  const handleFormSubmit = () => {
    if (ingredient.trim() !== '') {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredients List</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Add an Ingredient:</Text>
        <TextInput
          style={styles.input}
          value={ingredient}
          onChangeText={handleInputChange}
        />
        <Button title="Add" onPress={handleFormSubmit} />
      </View>
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.ingredient}>{item}</Text>
        )}
      />
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
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
  },
  ingredient: {
    fontSize: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default IngredientsList;