import { View, Text, Button, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import Icon from "@/assets/icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { pickImage } from "@/utils/imagePicker";

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPremission] = useCameraPermissions();
  const { top } = useSafeAreaInsets();

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View className="flex flex-1 justify-center">
        <Text>We need permission to show the camera</Text>
        <Button title="Allow Camera" onPress={requestPremission} />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View className="flex flex-1 justify-center">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing}>
        <View className="flex flex-1 justify-end bg-transparent ">
          <View
            style={{ marginBottom: top }}
            className="flex flex-row w-full items-center  justify-evenly gap-y-4 px 4"
          >
            <Pressable onPress={() => toggleCameraFacing()}>
              <Icon name="repeat" color={"#f9f9f9"} />
            </Pressable>
            <Pressable
              style={{ width: hp(7), height: hp(7) }}
              className="rounded-full border-[5px] border-neutral-300"
            ></Pressable>
            <Pressable onPress={() => pickImage()}>
              <Icon name="library" color={"#f9f9f9"} />
            </Pressable>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

export default CameraScreen;
