import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DessertsNearMe from './screens/DessertsNearMe';
import Recipes from './screens/Recipes';
import IngredientsList from './screens/IngredientsList';
import Account from './screens/Account';

type RootStackParamList = {
  HomeScreen: undefined;
  DessertsNearMe: undefined;
  Recipes: undefined;
  IngredientsList: undefined;
  Account: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function Layout() {
  return (
    <Stack.Navigator initialRouteName="screens/HomeScreen">
      <Stack.Screen name="screens/HomeScreen" component={HomeScreen} />
      <Stack.Screen name="screens/DessertsNearMe" component={DessertsNearMe} />
      <Stack.Screen name="screens/Recipes" component={Recipes} />
      <Stack.Screen name="screens/IngredientsList" component={IngredientsList} />
      <Stack.Screen name="screens/Account" component={Account} />
    </Stack.Navigator>
  );
}

export default Layout;
