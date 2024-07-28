import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type RecipeDetailsProps = {
  route: any;
};

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ route }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.subTitle}>Ingredients:</Text>
      {recipe.ingredients.map((ingredient: string, index: number) => (
        <Text key={index} style={styles.ingredient}>{ingredient}</Text>
      ))}
      <Text style={styles.subTitle}>Instructions:</Text>
      {recipe.instructions.map((instruction: string, index: number) => (
        <Text key={index} style={styles.instruction}>{instruction}</Text>
      ))}
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
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  ingredient: {
    fontSize: 16,
  },
  instruction: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default RecipeDetails;
