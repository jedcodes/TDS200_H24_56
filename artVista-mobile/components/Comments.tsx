import { View, Text } from "react-native";
import CustomAvatar from "./CustomAvatar";
import { Comment } from "@/types/type";

const Comments = ({ item }: { item: Comment }) => {
  return (
    <View key={item.id} className="flex-row gap-5 items-center mb-2">
      <CustomAvatar size="sm" showIcon={false} />
      <View className="flex-col items-start justify-start">
        <View className="flex-row items-center gap-x-1">
          <Text className="font-interSemiBold text-neutral-200">Username</Text>
          <Text className="text-neutral-400">30u</Text>
        </View>
        <Text className="text-left text-neutral-200">{item.comment}</Text>
      </View>
    </View>
  );
};

export default Comments;
