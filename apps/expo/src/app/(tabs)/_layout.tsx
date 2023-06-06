import React from "react";
import { Tabs } from "expo-router";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const ACTIVE_COLOR = "#7F4F24";
const INACTIVE_COLOR = "#929299";

const getIconColor = (focused: boolean) =>
  focused ? ACTIVE_COLOR : INACTIVE_COLOR;

const TabsNavigation = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerTitle: "Products",
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="coffee"
              size={24}
              color={getIconColor(focused)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: "Offers",
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="local-offer"
              size={24}
              color={getIconColor(focused)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "My Order",
          headerTitle: "Your Order",
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="shopping-cart"
              size={24}
              color={getIconColor(focused)}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsNavigation;
