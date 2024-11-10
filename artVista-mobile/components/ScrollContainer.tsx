import { ScrollView } from "react-native";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScrollContainer = ({ children }: { children: ReactNode }) => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView style={{ paddingTop: top, paddingHorizontal: 6 }}>
      {children}
    </ScrollView>
  );
};

export default ScrollContainer;
