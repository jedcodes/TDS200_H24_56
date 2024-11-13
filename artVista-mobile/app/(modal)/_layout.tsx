import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ModalLayour = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="editProfile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ModalLayour;
