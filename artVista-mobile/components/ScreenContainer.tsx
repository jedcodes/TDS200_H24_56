import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ScreenContainerProps } from "@/types/type";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenContainer = ({ children, bgColor }: ScreenContainerProps) => {
  // useSafeAreaInsets hjelper oss med å holde innholdet unna statuslinjen
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
        backgroundColor: bgColor,
        paddingHorizontal: 5,
      }}
    >
      {children}
    </View>
  );
};

export default ScreenContainer;
