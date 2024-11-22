import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icon from "@/assets/icons";

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
        color={`${focused ? "#FF204E" : "#FCFCFC"}`}
        fontSize={26}
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
          backgroundColor: "#0C0C0C",
          borderTopColor: "#0C0C0C",
          elevation: 1,
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
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="search" focused={focused} />
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
