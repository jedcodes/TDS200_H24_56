import { View, Text, StyleSheet } from "react-native";
import React from "react";

const PostFeedCard = ({ hasShadow = true }: { hasShadow?: boolean }) => {
  const customShadow = {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  };
  return (
    <View style={[styles.container, hasShadow && customShadow]}>
      <View className="flex flex-row justify-between">
        <View>
          <Text>User Img</Text>
          <View className="gap-2"></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: 15,
    borderCurve: "continuous",
    padding: 10,
    borderWidth: 0.8,
    shadowColor: "#000",
    backgroundColor: "#FCFCFC",
    paddingVertical: 12,
  },
});

export default PostFeedCard;
