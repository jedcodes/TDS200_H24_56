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
  name: string;
}) => {
  return (
    <View className={`flex items-center justify-center gap-2`}>
      <Icon name={icon} color={`${focused && "#3FCC7C"}`} />
      <Text
        className={`${
          focused
            ? "font-playfairSM text-primary-green"
            : "font-playfairRegular"
        } text-sm`}
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
        tabBarActiveTintColor: "#3FCC7C",
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 0.5,
          height: hp(10),
          margin: wp(10),
          borderRadius: 15,
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
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="saved" name="Saved" focused={focused} />
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
