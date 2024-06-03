// app/screens/DessertsNearMe.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
};

const recipes: Recipe[] = [
  { id:1, name: 'Rum Baba', ingredients: ['1 cup flour', '2 tablespoons sugar', '1/2 teaspoon salt', '1 package active dry yeast', '1/4 cup warm milk', '2 eggs', '1/4 cup melted butter', '1/2 cup dark rum', '1/2 cup water', '1/2 cup sugar'], instructions: ['Preheat oven to 375°F (190°C).\n', 'Mix flour, sugar, salt, and yeast in a bowl.\n', 'Add warm milk, eggs, and melted butter.\nMix until smooth.\n', 'Let the dough rise for about an hour.\n', 'Divide dough into greased muffin tins and bake for 15-20 minutes.\n', 'Combine rum, water, and sugar in a saucepan. Boil until syrupy.\n', 'Soak the baked babas in the rum syrup.'] },
  { id:2, name: 'Bread Pudding', ingredients: ['4 cups cubed bread', '2 cups milk', '1/4 cup butter', '1/2 cup sugar', '2 eggs', '1 teaspoon vanilla extract', '1/2 teaspoon ground cinnamon', '1/4 teaspoon salt'], instructions: ['Preheat oven to 350°F (175°C).\n', 'In a saucepan, heat milk and butter until butter melts.\n', 'In a bowl, mix sugar, eggs, vanilla, cinnamon, and salt.\n', 'Add warm milk mixture to the bowl.\n', 'Place bread cubes in a greased baking dish.\n', 'Pour mixture over the bread cubes.\n', 'Bake for 45-50 minutes until set.'] },
  { id:3, name: 'Molten Chocolate Cake', ingredients: ['1/2 cup unsalted butter', '4 oz bittersweet chocolate', '2 eggs', '2 egg yolks', '1/4 cup sugar', '2 tablespoons flour'], instructions: ['Preheat oven to 450°F (230°C).\n', 'Melt butter and chocolate in a bowl over simmering water.\n', 'In another bowl, beat eggs, egg yolks, and sugar until light and thick.\n', 'Fold chocolate mixture into egg mixture.\n', 'Add flour and mix gently.\n', 'Pour batter into greased ramekins.\n', 'Bake for 10-12 minutes until edges are set but center is soft.'] },
  { id:4, name: 'Hot Toddy Bread Pudding', ingredients: ['4 cups cubed bread', '2 cups milk', '1/4 cup butter', '1/2 cup sugar', '2 eggs', '1 teaspoon vanilla extract', '1/4 cup bourbon', '1/4 teaspoon nutmeg', '1/4 teaspoon salt'], instructions: ['Preheat oven to 350°F (175°C).\n', 'Heat milk and butter until butter melts.\n', 'Mix sugar, eggs, vanilla, bourbon, nutmeg, and salt.\n', 'Add warm milk mixture to the bowl.\n', 'Place bread cubes in a greased baking dish.\n', 'Pour mixture over the bread cubes.\n', 'Bake for 45-50 minutes until set.'] },
  { id:5, name: 'Savory Gin and Tonic Sorbet', ingredients: ['1 cup tonic water', '1/2 cup gin', '1/2 cup sugar', '1/4 cup lime juice', '1 tablespoon grated cucumber'], instructions: ['Combine tonic water, gin, sugar, lime juice, and cucumber.\n', 'Stir until sugar dissolves.\n', 'Freeze mixture in an ice cream maker according to manufacturer\'s instructions.'] },
  { id:6, name: 'Gazpacho Sorbet', ingredients: ['2 cups tomato juice', '1/2 cup cucumber, diced', '1/4 cup red bell pepper, diced', '1/4 cup onion, diced', '2 tablespoons olive oil', '2 tablespoons lemon juice', '1 clove garlic, minced', 'Salt and pepper to taste'], instructions: ['Combine all ingredients in a blender and puree until smooth.\n', 'Freeze mixture in an ice cream maker according to manufacturer\'s instructions.'] },
  { id:7, name: 'Boozy Ice Cream', ingredients: ['2 cups heavy cream', '1 cup milk', '3/4 cup sugar', '1/4 cup liquor of choice (e.g., bourbon, rum)', '1 teaspoon vanilla extract'], instructions: ['Mix cream, milk, sugar, liquor, and vanilla in a bowl.\n', 'Stir until sugar dissolves.\n', 'Freeze mixture in an ice cream maker according to manufacturer\'s instructions.'] },
  { id:8, name: 'Strawberry Pudding', ingredients: ['2 cups fresh strawberries, hulled and sliced', '1/2 cup sugar', '2 cups milk', '1/4 cup cornstarch', '1 teaspoon vanilla extract'], instructions: ['Puree strawberries and sugar in a blender.\n', 'In a saucepan, heat milk and cornstarch until thickened.\n', 'Add strawberry puree and vanilla to the saucepan.\n', 'Cook until mixture thickens.\n', 'Pour into serving dishes and chill before serving.'] },
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
    backgroundColor: '#FFDDDD',
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
