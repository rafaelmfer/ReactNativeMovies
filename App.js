import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Header from "./src/components/Header";
import HomeScreen from "./src/screens/HomeScreen";
import TVShowsScreen from "./src/screens/TVShowsScreen";
import ShowPageScreen from "./src/screens/ShowPageScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <Tab.Navigator
                initialRouteName="Movies"
                screenOptions={{
                    tabBarActiveTintColor: "#37474f",
                    tabBarInactiveTintColor: "#888",
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: "bold",
                        textTransform: "capitalize",
                    },
                    tabBarStyle: {
                        backgroundColor: "#fff",
                        borderBottomWidth: 1,
                        borderBottomColor: "#ccc",
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: "#fff",
                        height: 3,
                    },
                    tabBarItemStyle: {
                        paddingVertical: 4,
                    },
                    tabBarPressColor: "#ccc",
                }}
            >
                <Tab.Screen name="Movies" component={HomeScreen} />
                <Tab.Screen name="TV Shows" component={TVShowsScreen} />
            </Tab.Navigator>
        </View>
    );
}

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MainTabs">
                    <Stack.Screen
                        name="HomeScreen"
                        component={MainTabs}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="ShowPage"
                        component={ShowPageScreen}
                        options={{
                            headerShown: true,
                            headerBackTitle: "Back to List",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
