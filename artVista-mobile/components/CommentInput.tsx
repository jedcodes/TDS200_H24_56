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

  const handlePostComment = () => {
    postComment(postId, comment);
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
          style={{ height: hp(4), borderCurve: "continuous" }}
          className="flex-row items-center flex-1 gap-4 rounded-full bg-primary px-2 justify-between"
        >
          <BottomSheetTextInput
            placeholder="Legg til en kommentar..."
            onChangeText={(text) => setComment(text)}
            value={comment}
          />
          {isLoading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Pressable onPress={handlePostComment}>
              <Icon name="send" color="black" />
            </Pressable>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentInput;
