import CustomButton from "@/components/CustomButton";
import ScreenContainer from "@/components/ScreenContainer";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Index() {
  const router = useRouter();
  return (
    <ScreenContainer bgColor="bg-white">
      <View className=" flex-1 items-center justify-around">
        <Image
          style={{ width: wp(100), height: hp(35) }}
          resizeMode="contain"
          source={require("@/assets/images/welcome1.png")}
        />

        <View className="flex items-center ">
          <Text className="font-bold text-3xl font-playfairEB tracking-wider">
            ArtVista
          </Text>
          <Text className="font-playfairRegular text-center  text-lg">
            ArtVista, an innovative virtual artwork hub and digital exhibition
            platform.
          </Text>
        </View>
        <CustomButton
          title="Get Started"
          onPress={() => router.replace("/(tabs)/home")}
        />
      </View>
    </ScreenContainer>
  );
}
