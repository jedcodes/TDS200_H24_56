import { ScrollView } from "react-native";
import { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const CustomScrollView = ({ children }: { children: ReactNode }) => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView
      style={{
        paddingTop: top,
        paddingHorizontal: wp(5),
        backgroundColor: "#FCFCFC",
      }}
    >
      {children}
    </ScrollView>
  );
};

export default CustomScrollView;
