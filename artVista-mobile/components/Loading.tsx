import { ActivityIndicator, View } from "react-native";

const Loading = () => {
  return (
    <View className="flex flex-1 justify-center items-center">
      <ActivityIndicator size="large" color={"#A3E635"} />
    </View>
  );
};

export default Loading;
