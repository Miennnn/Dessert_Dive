import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IngredientsList from '../IngredientsList.tsx';

test('allows a person to add an ingredient to their list', () => {
  const { getByTestId, getByPlaceholderText, getByText } = render(<IngredientsList />);

  // Open the ingredient selection modal
  fireEvent.press(getByTestId('dropdown-button'));

  // Select an ingredient (assuming 'Sugar' is an option in the modal)
  fireEvent.press(getByText('Sugar'));

  // Check if the ingredient was added to the list
  expect(getByText('Sugar')).toBeTruthy();
});
