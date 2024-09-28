import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Header from './src/components/Header';
import MoviesScreen from './src/screens/HomeScreen';
// import SearchScreen from './src/screens/SearchScreen';
// import TVShowsScreen from './src/screens/TVShowsScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}> 
          <Header />
          <Tab.Navigator
            initialRouteName="Movies"
            screenOptions={{
              tabBarActiveTintColor: '#37474f',
              tabBarInactiveTintColor: '#888',
              tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
              tabBarStyle: { 
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderBottomColor: '#ccc'
              },
              tabBarIndicatorStyle: { 
                backgroundColor: '#fff',
                height: 3
              },
              tabBarItemStyle: {
                paddingVertical: 4
              },
              tabBarPressColor: '#ccc',
            }}
          >
            <Tab.Screen name="Movies" component={MoviesScreen} />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}