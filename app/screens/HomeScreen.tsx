import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import DessertsNearMe from './DessertsNearMe';
import Questionnaire from './Questionnaire';
import IngredientsList from './IngredientsList';
import Recipes from './Recipes';
import Account from './Account';

type RootStackParamList = {
  HomeScreen: { preferences?: any };
  DessertsNearMe: undefined;
  Recipes: undefined;
  IngredientsList: undefined;
  Questionnaire: undefined;
  Account: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const Title: React.FC = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Welcome to Dessert Dive</Text>
    </View>
  );
};

const Buttons: React.FC<{ navigation: HomeScreenNavigationProp }> = ({ navigation }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DessertsNearMe')}>
        <Text style={styles.buttonText}>Desserts near me</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Questionnaire')}>
        <Text style={styles.buttonText}>Questionnaire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IngredientsList')}>
        <Text style={styles.buttonText}>Ingredients list</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recipes')}>
        <Text style={styles.buttonText}>Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Account')}>
        <Text style={styles.buttonText}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFDDDD', dark: '#FFDDDD' }}
      headerImage={
        <Image
          source={require('@/assets/images/Cookies_and_Coffee.png')}
          style={styles.dessertDiveLogo}
        />
      }
    >
      <View style={styles.container}>
        <Title />
        <View style={styles.stepContainer}>
        <Text style={styles.subtitle}></Text>
          <Text style={styles.subtitle}>What would you like to do today?</Text>
        </View>
        <Buttons navigation={navigation} />
      </View>
    </ParallaxScrollView>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DessertsNearMe" component={DessertsNearMe} />
        <Stack.Screen name="Questionnaire" component={Questionnaire} />
        <Stack.Screen name="IngredientsList" component={IngredientsList} />
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDDDD',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  stepContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
    borderWidth: 2, 
    borderColor: 'black', 
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  dessertDiveLogo: {
    height: 250,
    width: 450,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

export default App;
