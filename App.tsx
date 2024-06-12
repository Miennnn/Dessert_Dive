
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Layout from './app/_layout';

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
      <Layout />
    </NavigationContainer>
  );
}

export default App;
