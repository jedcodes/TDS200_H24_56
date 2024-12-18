import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import useFetchArtist from "@/hooks/useFetchArtist";
import CustomAvatar from "./CustomAvatar";
import Icon from "@/assets/icons";
import useAddComment from "@/hooks/useAddComment";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

const CommentInput = ({ postId }: { postId: string }) => {
  const { artist } = useFetchArtist();
  const { postComment, isLoading } = useAddComment();
  const [comment, setComment] = React.useState<string>("");

  const handlePostComment = async () => {
    await postComment(postId, comment);
    setComment("");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="w-full"
    >
      <View className="flex-row items-center  w-full justify-start px-4 gap-x-2">
        <CustomAvatar size="sm" showIcon={false} imageUrl={artist?.photoURL} />
        <View
          style={{ height: hp(5), borderCurve: "continuous" }}
          className="flex-row items-center flex-1 gap-4 rounded-full bg-primary-gary px-4 justify-between"
        >
          <BottomSheetTextInput
            placeholder="Legg til en kommentar..."
            placeholderTextColor={"gray"}
            onChangeText={(text) => setComment(text)}
            value={comment}
            style={{ color: "gray" }}
          />
          {isLoading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Pressable onPress={handlePostComment}>
              <Icon name="send" color="gray" />
            </Pressable>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentInput;
