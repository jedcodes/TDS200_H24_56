import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icon from "@/assets/icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const TabIcon = ({
  focused,
  icon,
  name,
}: {
  focused: boolean;
  icon: any;
  name?: string;
}) => {
  return (
    <View className={`flex items-center justify-center gap-2`}>
      <Icon
        name={icon}
        color={`${focused ? "#A3E635" : "#848484"}`}
        fontSize={28}
      />
      <Text
        className={`${
          focused
            ? "font-interSemiBold text-secondary"
            : "font-interRegular text-primary-light"
        } text-lg`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A3E635",
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          height: hp(12),
          borderTopColor: "#0A0A0A",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="newPost"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon="add" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="favourite" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="user" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
