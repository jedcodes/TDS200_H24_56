import { View } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import useFetchArtist from "@/hooks/useFetchArtist";
import Loading from "@/components/Loading";
import ProfileHeader from "@/components/ProfileHeader";
import useFetchProfilePosts from "@/hooks/useFetchProfilePosts";
import { useEffect, useState } from "react";
import useProfileStore from "@/store/useProfileStore";
import PostGridList from "@/components/PostGridList";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const { isAuthenticated, artist: user } = useAuth();
  const router = useRouter();
  // sjekker om brukeren er autentisert. hvos ikke, sendes brukeren tilbake til innloggingsiden. Deene effekten kjører hver gang isAuthenticated endres.
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/sign-in");
    }
  }, [isAuthenticated]);
  const { artist, isLoading } = useFetchArtist();
  const { getProfilePosts } = useFetchProfilePosts();
  const { profilePosts } = useProfileStore();
  const [canEdit, setCanEdit] = useState(false);

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
        ListHeaderComponent={() => <ProfileHeader canEdit={false} />}
        data={profilePosts}
        numColumns={2}
        renderItem={({ item }) => (
          <PostGridList showDelete={true} post={item} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ProfileScreen;
