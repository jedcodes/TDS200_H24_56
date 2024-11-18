import { useRouter } from "expo-router";
import { Image, StatusBar, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-end bg-black">
      <StatusBar barStyle={"light-content"} />
      <Image
        source={require("@/assets/images/welcome1.png")}
        className="absolute w-full h-full"
      />
      <LinearGradient
        style={{
          width: wp(100),
          height: hp(70),
        }}
        colors={[
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.5)",
          "#fff",
          "#fff",
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        className="justify-end"
      >
        {/* Lagt til layout animasjon med Reanimated */}
        <Animated.View
          entering={FadeInDown.duration(800)}
          className="items-center flex-1 pb-12 space-y-8 justify-end mx-4 gap-5"
        >
          <Text
            style={{ fontSize: hp(5) }}
            className=" font-interExtraBold tracking-wider"
          >
            ArtVista
          </Text>
          <View>
            <Text className="text-left  text-xl">
              Follow your favorite artists, and view their latest art piece or
              connect to new artists and share art piece with your friends.
            </Text>
          </View>
          <View className="w-full">
            <CustomButton
              title="Start Exploring"
              onPress={() => router.push("/(tabs)/home")}
              bgVariant="primary"
              textVariant="primary"
            />
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}
