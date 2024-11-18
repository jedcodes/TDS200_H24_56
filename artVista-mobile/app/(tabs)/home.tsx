import {
  View,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { router, useRouter } from "expo-router";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import ScreenContainer from "@/components/ScreenContainer";
import CustomHeader from "@/components/CustomHeader";
import EmptyList from "@/components/EmptyList";
import Loading from "@/components/Loading";
import PostFeedCard from "@/components/PostFeedCard";
import usePaginatedPosts from "@/hooks/usePaginatedPosts";
import ToastManager, { Toast } from "toastify-react-native";
import usePostStore from "@/store/usePostStore";
import { useEffect, useRef, useState } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import useFetchArtist from "@/hooks/useFetchArtist";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { getPaginatedPosts } = usePaginatedPosts();
  const { setPosts, posts } = usePostStore();
  const { artist } = useFetchArtist();
  const lastDocRef = useRef<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);

  const fetchFeedPost = async () => {
    setRefreshing(true);
    try {
      const { snapshots, last } = await getPaginatedPosts(lastDocRef.current);
      lastDocRef.current = last;
      setPosts(snapshots);
    } catch (error) {
      Toast.error("Failed to fetch posts");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeedPost();
  }, []);

  return (
    <ScreenContainer bgColor="bg-primary">
      <ToastManager />
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={posts}
        contentContainerStyle={{ paddingTop: 20, paddingHorizontal: wp(4) }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostFeedCard post={item} />}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={loadMore} />
        // }
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
