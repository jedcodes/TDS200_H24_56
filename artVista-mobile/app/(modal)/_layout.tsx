import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ModalLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="camera" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ModalLayout;
