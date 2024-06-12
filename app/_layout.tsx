import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';


function Layout() {

  const OuterStack = createNativeStackNavigator();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);


  return (
    <NavigationContainer independent={true}>
      <OuterStack.Navigator initialRouteName="Login">
          {user ?  (
            <OuterStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
          ) : (
            <OuterStack.Screen name="Login" component={Login} />
          )
          }
      </OuterStack.Navigator>
    </NavigationContainer>
  );
}

export default Layout;