import Icon from "@/assets/icons";
import Loading from "@/components/Loading";
import useFetchFeedById from "@/hooks/useFetchFeedById";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const MapViewModal = () => {
  const { id } = useLocalSearchParams();
  const { post } = useFetchFeedById(id as string);
  if (!post) return <Loading />;

  const initRegion = {
    latitude: post.location.latitude,
    longitude: post.location.longitude,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0421,
  };
  return (
    <View className="flex-1">
      <MapView style={StyleSheet.absoluteFill} initialRegion={initRegion} />
      <Pressable onPress={() => router.back()}>
        <Icon name="close" color={"black"} fontSize={hp(5)} />
      </Pressable>
    </View>
  );
};

export default MapViewModal;
