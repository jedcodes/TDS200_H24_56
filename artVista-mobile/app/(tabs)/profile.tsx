import { View, Text } from "react-native";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import useFetchArtist from "@/hooks/useFetchArtist";
import Loading from "@/components/Loading";
import ProfileHeader from "@/components/ProfileHeader";
import useFetchProfilePosts from "@/hooks/useFetchProfilePosts";
import { useEffect, useState } from "react";
import useProfileStore from "@/store/useProfileStore";
import PostGridList from "@/components/PostGridList";
import { useAuth } from "@/context/authContext";

const ProfileScreen = () => {
  const { artist, isLoading } = useFetchArtist();
  const { artist: user } = useAuth();
  const { getProfilePosts } = useFetchProfilePosts();
  const { profilePosts } = useProfileStore();
  const [canEdit, setCanEdit] = useState(true);

  useEffect(() => {
    if (artist) {
      getProfilePosts(artist.id);
    }
  }, [artist]);

  useEffect(() => {
    if (user?.uid === artist?.id) {
      setCanEdit(true);
    }
    setCanEdit(false);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <View className="bg-primary flex-1">
      <MasonryFlashList
        ListHeaderComponent={() => <ProfileHeader canEdit={canEdit} />}
        data={profilePosts}
        numColumns={2}
        renderItem={({ item }) => (
          <PostGridList post={item} canDelete={canEdit} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ProfileScreen;
