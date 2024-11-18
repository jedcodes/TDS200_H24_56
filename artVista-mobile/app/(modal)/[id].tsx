import { View, Text, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useFetchFeedById from "@/hooks/useFetchFeedById";
import Loading from "@/components/Loading";
import ScrollContainer from "@/components/CustomScrollView";
import PostFeedCard from "@/components/PostFeedCard";
import Icon from "@/assets/icons";
import TextInputField from "@/components/CustomTextInput";

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
      <View className="flex-row items-center gap-10">
        <TextInputField placeholder="Type comment..." />
      </View>
    </ScrollContainer>
  );
};

export default PostDetailScreen;
