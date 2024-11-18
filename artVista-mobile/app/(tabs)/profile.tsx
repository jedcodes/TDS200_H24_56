import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import useFetchArtist from "@/hooks/useFetchArtist";
import Loading from "@/components/Loading";
import ProfileHeader from "@/components/ProfileHeader";

const ProfileScreen = () => {
  const { isLoading } = useFetchArtist();
  const DATA = [
    {
      title: "First Item",
    },
    {
      title: "Second Item",
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <View className="bg-primary flex-1">
      <FlashList
        ListHeaderComponent={() => <ProfileHeader />}
        data={DATA}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ProfileScreen;
