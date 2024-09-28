import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SafestRoute from "./safest-route";
import { Stack } from "expo-router";


const AppNavigator = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="safest-route"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="book-a-ride"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="emergency-contacts"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AppNavigator;
