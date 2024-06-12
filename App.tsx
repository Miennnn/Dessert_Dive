import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Login from './app/Login';
import HomeScreen from '.app/HomeScreen';
import DessertsNearMe from './app/screens/DessertsNearMe';
import Recipes from './app/screens/Recipes';
import IngredientsList from './app/screens/IngredientsList';
import Questionnaire from './app/screens/Questionnaire';
import Account from './app/screens/Account';

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DessertsNearMe" component={DessertsNearMe} />
            <Stack.Screen name="Recipes" component={Recipes} />
            <Stack.Screen name="IngredientsList" component={IngredientsList} />
            <Stack.Screen name="Questionnaire" component={Questionnaire} />
            <Stack.Screen name="Account" component={Account} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;