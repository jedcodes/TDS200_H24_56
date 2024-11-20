import React, { forwardRef, useEffect, useMemo } from "react";
import { BottomSheetFlashList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
import { Comment, Post } from "@/types/type";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CommentInput from "./CommentInput";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Comments from "./Comments";
import useGetFeedComments from "@/hooks/useGetFeedComments";
import usePostStore from "@/store/usePostStore";
import Loading from "./Loading";
import useFetchFeedById from "@/hooks/useFetchFeedById";

type Ref = BottomSheetModal;
interface CommentProps {
  posts: Post;
}

const CommentBottomSheet = forwardRef<Ref, CommentProps>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "55%"], []);
  const { top } = useSafeAreaInsets();

  return (
    <BottomSheetModal
      index={1}
      ref={ref}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
    >
      <View className="bg-primary-dark flex-1 border-t-[40px]">
        <View className="justify-center items-center">
          <Text
            style={{ fontSize: hp(2) }}
            className="text-white font-interSemiBold"
          >
            Kommentarer
          </Text>
        </View>
        <BottomSheetFlashList
          data={props.posts.comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Comments item={item} />}
          estimatedItemSize={43.3}
        />
        <View
          style={{ paddingVertical: top / 2 }}
          className="flex-row items-center w-full"
        >
          <CommentInput postId={props.posts.id} />
        </View>
      </View>
    </BottomSheetModal>
  );
});

export default CommentBottomSheet;
