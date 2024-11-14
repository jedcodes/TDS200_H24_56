import { View, Text, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useFetchFeedById from "@/hooks/useFetchFeedById";
import Loading from "@/components/Loading";
import ScrollContainer from "@/components/ScrollContainer";
import PostFeedCard from "@/components/PostFeedCard";
import Icon from "@/assets/icons";

const PostDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { post, isLoading } = useFetchFeedById(id as string);

  if (isLoading) {
    return <Loading />;
  }

  console.log(post);
  return (
    <ScrollContainer>
      <PostFeedCard hasShadow={false} post={post} />
      <View className=" flex flex-row flex-1 items-center w-full justify-between ">
        <View className="px-2 py-3 rounded-lg border-[2px] w-full">
          <TextInput />
        </View>
        <View className="w-full">
          <Text>Send</Text>
        </View>
      </View>
    </ScrollContainer>
  );
};

export default PostDetailScreen;
