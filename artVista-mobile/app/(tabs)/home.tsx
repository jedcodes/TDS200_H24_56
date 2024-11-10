import { View, Text, FlatList, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenContainer from "@/components/ScreenContainer";
import TextInputField from "@/components/TextInputField";
import CustomHeader from "@/components/CustomHeader";
import EmptyList from "@/components/EmptyList";
import ArtWordCard from "@/components/ArtWordCard";
import { useRouter } from "expo-router";
import { ArtWork } from "@/types/type";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAllArtworks } from "@/api/uploadArtWorkAPI";

const HomeScreen = () => {
  const router = useRouter();
  const [artworks, setArtworks] = useState<ArtWork[]>([]);

  const fetchArtworks = async () => {
    const unsub = onSnapshot(doc(db, "artworks"), (doc) => {
      if (doc.exists()) {
        setArtworks(doc.data().artworks);
      }
    });
    // const response = await getAllArtworks();
    // setArtworks(response);

    return () => unsub();
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  return (
    <ScreenContainer bgColor="bg-primary">
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={artworks}
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
              <Text className="text-xl font-interRegular mb-3">
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
