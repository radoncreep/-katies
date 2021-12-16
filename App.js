import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./stores/rootReducer";

import CustomDrawer from './navigation/CustomDrawer';
import Onboarding from "./screens/Onboarding/Onboarding";
import { AddCardScreen, CardsScreen, CartTab, Checkout, FoodDetails, ForgotPassword, Otp, SignIn, SignUp } from "./screens";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

const Stack = createStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'Onboarding'}
                >
                    <Stack.Screen 
                        name="Onboarding"
                        component={Onboarding}
                    />
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                    />
                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPassword}
                    />
                    <Stack.Screen
                        name="Otp"
                        component={Otp}
                    />
                    <Stack.Screen
                        name="Home"
                        component={CustomDrawer}
                    />
                    <Stack.Screen
                        name="FoodDetails"
                        component={FoodDetails}
                    />
                    <Stack.Screen
                        name="MyCart"
                        component={CartTab}
                    />
                    <Stack.Screen
                        name="CardsScreen"
                        component={CardsScreen}
                    />
                    <Stack.Screen
                        name="AddCard"
                        component={AddCardScreen}
                    />
                    <Stack.Screen
                        name="Checkout"
                        component={Checkout}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App