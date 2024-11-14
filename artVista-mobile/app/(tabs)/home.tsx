import {
  View,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import ScreenContainer from "@/components/ScreenContainer";
import CustomHeader from "@/components/CustomHeader";
import EmptyList from "@/components/EmptyList";
import useFetchFeeds from "@/hooks/useFetchFeeds";
import Loading from "@/components/Loading";
import PostFeedCard from "@/components/PostFeedCard";
import usePaginatedPosts from "@/hooks/usePaginatedPosts";

const HomeScreen = () => {
  const router = useRouter();
  const { posts, isLoading, loadMore, hasMore } = usePaginatedPosts(2);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <ScreenContainer bgColor="bg-primary">
      <StatusBar barStyle="dark-content" />
      <FlatList
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        data={posts}
        contentContainerStyle={{ paddingTop: 20, paddingHorizontal: wp(4) }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostFeedCard hasShadow post={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 space-y-6">
            <CustomHeader
              newPostRoute={() => router.push("/(tabs)/newPost")}
              title="ArtVista"
              iconOneName="add"
              iconTwoName={"favourite"}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyList title="No Art works are avalible at this moment" />
        )}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : hasMore ? null : (
            <Text style={{ textAlign: "center", marginTop: 16 }}>
              No more posts
            </Text>
          )
        }
      />
    </ScreenContainer>
  );
};

export default HomeScreen;
