import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import useGetArtistById from "@/hooks/useGetArtistById";
import useFetchProfilePosts from "@/hooks/useFetchProfilePosts";
import useProfileStore from "@/store/useProfileStore";
import { MasonryFlashList } from "@shopify/flash-list";
import ProfileHeader from "@/components/ProfileHeader";
import PostGridList from "@/components/PostGridList";

const ProfileModal = () => {
  const { id } = useLocalSearchParams();
  const { artistProfile } = useGetArtistById(id as string);
  const { getProfilePosts } = useFetchProfilePosts();
  const { profilePosts } = useProfileStore();

  useEffect(() => {
    if (artistProfile) {
      getProfilePosts(artistProfile.id);
    }
  }, []);

  return (
    <View className="bg-primary flex-1">
      <MasonryFlashList
        ListHeaderComponent={() => <ProfileHeader canEdit={false} />}
        data={profilePosts}
        numColumns={2}
        renderItem={({ item }) => (
          <PostGridList post={item} canDelete={false} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ProfileModal;
