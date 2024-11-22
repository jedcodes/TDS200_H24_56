import { View, StatusBar } from "react-native";
import ToastManager from "toastify-react-native";
import { FlashList } from "@shopify/flash-list";

import ScreenContainer from "@/components/ScreenContainer";
import CustomHeader from "@/components/CustomHeader";
import EmptyList from "@/components/EmptyList";
import Loading from "@/components/Loading";
import PostFeedCard from "@/components/PostFeedCard";
import useFetchFeeds from "@/hooks/useFetchFeeds";
import usePostStore from "@/store/usePostStore";

const HomeScreen = () => {
  const { isLoading } = useFetchFeeds();
  const { posts } = usePostStore();

  if (isLoading) return <Loading />;
  return (
    <ScreenContainer bgColor="bg-primary">
      <ToastManager />
      <StatusBar barStyle="light-content" />
      <FlashList
        estimatedItemSize={200}
        data={posts}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item }) => <PostFeedCard post={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 space-y-6">
            <CustomHeader title="ArtVista" />
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
