import { View, Text, FlatList, StatusBar } from "react-native";
import { useRouter } from "expo-router";

import ScreenContainer from "@/components/ScreenContainer";
import TextInputField from "@/components/TextInputField";
import CustomHeader from "@/components/CustomHeader";
import EmptyList from "@/components/EmptyList";
import useFetchFeeds from "@/hooks/useFetchFeeds";
import Loading from "@/components/Loading";
import PostFeedCard from "@/components/PostFeedCard";
import { SAMPLE_DATA } from "@/constants/DATA";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const HomeScreen = () => {
  const router = useRouter();
  const { posts, isLoading } = useFetchFeeds();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScreenContainer bgColor="bg-primary">
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={SAMPLE_DATA}
        contentContainerStyle={{ paddingTop: 20, paddingHorizontal: wp(4) }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostFeedCard hasShadow />}
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
