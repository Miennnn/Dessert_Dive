import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Login from '../Login';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';

// Mock the Firebase functions
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

describe('Login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('calls signInWithEmailAndPassword with correct credentials', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText('Email'), email);
    fireEvent.changeText(getByPlaceholderText('Password'), password);
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(FIREBASE_AUTH, email, password);
    });
  });

  it('calls createUserWithEmailAndPassword when creating an account', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText('Email'), email);
    fireEvent.changeText(getByPlaceholderText('Password'), password);
    fireEvent.press(getByText('Create account'));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(FIREBASE_AUTH, email, password);
    });
  });

  it('displays an error message if signInWithEmailAndPassword fails', async () => {
    const email = 'test@example.com';
    const password = 'password';
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Sign in failed'));
    const { getByPlaceholderText, getByText, findByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText('Email'), email);
    fireEvent.changeText(getByPlaceholderText('Password'), password);
    fireEvent.press(getByText('Login'));

    const errorMessage = await findByText('Sign in failed: Sign in failed');
    expect(errorMessage).toBeTruthy();
  });
});
