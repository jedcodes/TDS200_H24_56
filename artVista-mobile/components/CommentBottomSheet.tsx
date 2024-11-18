import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetFlashList,
  BottomSheetModal,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
import { Comment } from "@/types/type";

type Ref = BottomSheetModal;
interface CommentProps {
  comments: Comment[];
}

const CommentBottomSheet = forwardRef<Ref, CommentProps>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "70%"], []);

  const sheetRef = useRef<BottomSheet>(null);
  //   const handleSnapPress = useCallback((index: number) => {
  //     sheetRef.current?.snapToIndex(index);
  //   }, []);

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );

  const renderItem = useCallback(({ item }: { item: string }) => {
    return (
      <View key={item}>
        <Text>{item}</Text>
      </View>
    );
  }, []);

  return (
    <BottomSheetModal
      index={1}
      ref={ref}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
    >
      <View className="bg-primary-dark flex-1">
        <BottomSheetFlashList
          data={data}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          estimatedItemSize={43.3}
        />
      </View>
    </BottomSheetModal>
  );
});

export default CommentBottomSheet;
