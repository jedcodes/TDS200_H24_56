import { View, Text, StatusBar, FlatList } from "react-native";
import React from "react";
import ScreenContainer from "@/components/ScreenContainer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TextInputField from "@/components/TextInputField";
import ArtWorkGrid from "@/components/ArtWorkGrid";
import { SAMPLE_DATA } from "@/constants/DATA";
import CustomHeader from "@/components/CustomHeader";
import EmptyList from "@/components/EmptyList";
import ArtWordCard from "@/components/ArtWordCard";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();
  return (
    <ScreenContainer bgColor="bg-primary-dark">
      <FlatList
        data={SAMPLE_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ArtWordCard item={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 space-y-6">
            <CustomHeader
              newPostRoute={() => router.push("/(tabs)/newPost")}
              title="ArtVista"
              iconOneName="add"
              iconTwoName={"favourite"}
            />
            <TextInputField
              placeholder="Search for artist ..."
              icon={"search"}
              iconStyle="#A3E635"
            />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-xl font-interRegular text-gray-100 mb-3">
                Highest Voted Art works
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyList title="No Art works are avalible at this moment" />
        )}
      />
    </ScreenContainer>
  );
};

export default HomeScreen;
