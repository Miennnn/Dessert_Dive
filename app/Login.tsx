import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error: any) {
            console.log(error);
            alert ('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!');
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}>
            </TextInput>
            <TextInput 
              secureTextEntry={true}
              value={password}
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}>
            </TextInput>
            { loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <Button title="Login" onPress={signIn} />
                <Button title="Create account" onPress={signUp} />
              </>
            )}
          </KeyboardAvoidingView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFDDDD',
      justifyContent: 'center',
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
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 8,
      marginRight: 8,
      marginLeft: 8,
      marginVertical: 8,
    },
    ingredient: {
      fontSize: 16,
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
  });

export default Login;