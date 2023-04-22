import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useState } from "react"
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'

// components
import HomeScreen from "./components/Home.js"
import BudgetScreen from './components/Budget.js';
import ExpenseScreen from './components/Expense.js';

const Stack = createNativeStackNavigator()

export default function App() {

  // categories
  let EXPENSES = [
    {category: "food", amount: 25.89, date:"4/15/2023", notes:"mcdonalds"},
    {category: "transport", amount: 40.36, date:"4/10/2023", notes:"uber"},
    {category: "rent", amount: 1010.00, date:"4/1/2023", notes:""},
    {category: "utilities", amount: 50.83, date:"4/1/2023", notes:""},
    {category: "clothing", amount: 36.78, date:"4/13/2023", notes:"target"},
    {category: "pet", amount: 5.09, date:"4/19/2023", notes:"cat treats"},
    {category: "subscriptions", amount: 10.00, date:"4/16/2023", notes:"hbo"}
  ]

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{updatedBudget: 0, infoArray: EXPENSES}}/>
        <Stack.Screen name="Budget" component={BudgetScreen}/>
        <Stack.Screen name="Expense" component={ExpenseScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
