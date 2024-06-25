import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
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
            alert('Sign in failed: ' + error.message);
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
            alert('Sign up failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.signupText}>Please sign in to continue</Text>
                <Text style={styles.signupText}></Text>
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999" 
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    secureTextEntry={true}
                    value={password}
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999" 
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <TouchableOpacity style={styles.loginButton} onPress={signIn}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                )}
            </KeyboardAvoidingView>
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={signUp}>
                    <Text style={styles.signupButtonText}>Create account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#FFDDDD',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'left',
        color: 'black',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
        width: '100%',
        backgroundColor: 'white', 
    },
    signupContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    signupText: {
        fontSize: 16,
        color: 'black',
    },
    signupButtonText: {
        fontSize: 16,
        color: '#0000ff',
        marginTop: 8,
    },
    loginButton: {
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
    loginButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;
