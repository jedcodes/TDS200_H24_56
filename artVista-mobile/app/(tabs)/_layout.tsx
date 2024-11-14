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
        color={`${focused ? "#25C0B7" : "#21302F"}`}
        fontSize={28}
      />
      <Text
        className={`${
          focused
            ? "font-interSemiBold text-secondary"
            : "font-interRegular text-primary-dark"
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
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FCFCFC",
          height: hp(12),
          borderTopColor: "#FCFCFC",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="home" name="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="search" name="Search" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="newPost"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="add" name="New Post" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="favourite" name="Favorites" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="user" name="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
