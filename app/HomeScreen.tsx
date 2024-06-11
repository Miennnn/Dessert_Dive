import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

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
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Dessert Dive</ThemedText>
    </ThemedView>
  );
};

const Buttons: React.FC<{ navigation: HomeScreenNavigationProp }> = ({ navigation }) => {
  return (
    <ThemedView style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DessertsNearMe')}>
        <ThemedText style={styles.buttonText}>Desserts near me</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Questionnaire')}>
        <ThemedText style={styles.buttonText}>Questionnaire</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IngredientsList')}>
        <ThemedText style={styles.buttonText}>Ingredients list</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recipes')}>
        <ThemedText style={styles.buttonText}>Recipes</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Account')}>
        <ThemedText style={styles.buttonText}>Account</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const HomeScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Cookies_and_Coffee.png')}
          style={styles.dessertDiveLogo}
        />
      }
    >
      <Title />
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">What would you like to do today?</ThemedText>
      </ThemedView>
      <Buttons navigation={navigation} />
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  stepContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
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

export default HomeScreen;
