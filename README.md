## Dessert Dive
Dessert Dive is a React Native application designed to help users find desserts near them, explore recipes, manage an ingredients list, and handle their account information.

# Table of Contents
Installation
Usage
Project Structure
Navigation
Screens
Components
Contributing
License
Installation
Prerequisites

# Before you begin, ensure you have met the following requirements:

You have installed Node.js and npm.
You have installed React Native CLI.
You have installed Expo CLI (if using Expo).

# Steps

Clone the repository:
git clone https://github.com/your-username/dessert-dive.git

Navigate to the project directory:
cd dessert-dive

Install the dependencies:
npm install

Start the Metro bundler:
npm start


# Here's a brief overview of the project's structure:

app/
  _layout.tsx
  +html.tsx
  +not-found.tsx
  screens/
    Account.tsx
    DessertsNearMe.tsx
    HomeScreen.tsx
    IngredientsList.tsx
    Recipes.tsx
components/
  ParallaxScrollView.tsx
  ThemedComponents.tsx
App.tsx

# Explanation
app/_layout.tsx: Contains the stack navigator setup.
app/+html.tsx: Custom HTML wrapper for web (if applicable).
app/+not-found.tsx: Handles 404 errors.
app/screens/: Directory containing all screen components.
components/: Directory containing shared components.
App.tsx: Entry point of the application.

# Navigation
The navigation setup uses React Navigation's stack navigator:

Home Screen: Main entry point of the app.
Desserts Near Me: Displays desserts available near the user.
Recipes: Shows a list of dessert recipes.
Ingredients List: Manages the user's ingredients list.
Account: Handles user account information.

# Screens
HomeScreen.tsx
The main screen that includes navigation buttons to other screens.

DessertsNearMe.tsx
Displays desserts available near the user.

Recipes.tsx
Shows a list of dessert recipes.

IngredientsList.tsx
Manages the user's ingredients list.

Account.tsx
Handles user account information.
