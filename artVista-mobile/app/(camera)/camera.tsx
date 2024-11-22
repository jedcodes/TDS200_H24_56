import { View, Text, Button, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import Icon from "@/assets/icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomBackButton from "@/components/CustomBackButton";
import { useRouter } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import usePickImage from "@/hooks/usePickImage";
import useImageStore from "@/store/useImageStore";

const CameraScreen = () => {
  const { updateImageUrl } = useImageStore();
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPremission] = useCameraPermissions();
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const { pickImage } = usePickImage();
  const [photo, setPhoto] = useState<string | null>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <Text>We need permission to show the camera</Text>
        <Button title="Allow Camera" onPress={requestPremission} />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo?.uri!);
      updateImageUrl(photo?.uri!);

      const asset = await MediaLibrary.createAssetAsync(photo?.uri!);
      await MediaLibrary.createAlbumAsync("ArtVista", asset, false);
    }
  };

  return (
    <View className="flex flex-1 justify-center">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing}>
        <View style={{ paddingTop: top, paddingHorizontal: top / 2 }}>
          <CustomBackButton onPress={() => router.back()} />
        </View>
        <View className="flex flex-1 justify-end bg-transparent ">
          <View
            style={{ marginBottom: top }}
            className="flex flex-row w-full items-center  gap-y-4 px 4"
          >
            <Pressable onPress={() => toggleCameraFacing()}>
              <Icon name="repeat" color={"#FF204E"} fontSize={hp(4)} />
            </Pressable>
            <Pressable
              onPress={handleTakePicture}
              style={{ width: hp(7), height: hp(7) }}
              className="rounded-full border-[5px] border-neutral-300"
            ></Pressable>
            <Pressable onPress={() => pickImage()}>
              <Icon name="library" color={"#FF204E"} fontSize={hp(4)} />
            </Pressable>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

export default CameraScreen;
