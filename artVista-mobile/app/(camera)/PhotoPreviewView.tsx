import { View, Text } from "react-native";
import React from "react";
import ScreenContainer from "@/components/ScreenContainer";
import { Image } from "expo-image";

const PhotoPreviewView = ({
  photo,
  handleRetakePhoto,
}: {
  photo: string;
  handleRetakePhoto: () => void;
}) => {
  return (
    <ScreenContainer>
      <View className="flex-1 justify-end">
        <Image source={photo} />
      </View>
    </ScreenContainer>
  );
};

export default PhotoPreviewView;
