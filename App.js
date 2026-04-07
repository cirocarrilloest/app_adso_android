import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import EmployeeListScreen from './src/screens/EmployeeListScreen';
import CreateEmployeeScreen from './src/screens/CreateEmployeeScreen';
import EditEmployeeScreen from './src/screens/EditEmployeeScreen';

// Creamos el navegador tipo stack para movernos entre pantallas.
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />

      {/* NavigationContainer envuelve toda la app para habilitar React Navigation. */}
      {/* Stack.Navigator controla la navegacion entre pantallas y comparte estilos generales. */}
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2563EB' },
          headerTintColor: '#FFFFFF',
          contentStyle: { backgroundColor: '#F5F7FB' },
        }}
      >
        <Stack.Screen
          name="Lista"
          component={EmployeeListScreen}
          options={{ title: 'Lista de empleados' }}
        />
        <Stack.Screen
          name="Crear"
          component={CreateEmployeeScreen}
          options={{ title: 'Crear empleado' }}
        />
        <Stack.Screen
          name="Editar"
          component={EditEmployeeScreen}
          options={{ title: 'Editar empleado' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
