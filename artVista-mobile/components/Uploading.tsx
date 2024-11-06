import { View, Text } from "react-native";
import { Image } from "expo-image";
import React from "react";
import ProgressBar from "./ProgressBar";

const Uploading = ({
  image,
  progress,
}: {
  image: string;
  progress: number;
}) => {
  return (
    <View className="flex justify-center items-center">
      <Image
        style={{ width: 100, height: 100, borderRadius: 6 }}
        source={image}
      />
      <Text className="text-white text-xl">Uploading ...</Text>
      <ProgressBar progress={progress} />
    </View>
  );
};

export default Uploading;
