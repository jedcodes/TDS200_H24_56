import { ActivityIndicator, View } from "react-native";

const Loading = () => {
  return (
    <View className="flex flex-1 justify-center items-center bg-primary">
      <ActivityIndicator size="large" color={"#FF204E"} />
    </View>
  );
};

export default Loading;
