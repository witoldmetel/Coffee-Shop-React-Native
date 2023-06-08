import React from "react";
import { Text, View } from "react-native";
import { Tabs } from "expo-router";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { useCartManager } from "~/hooks/useCartManager";

const ACTIVE_COLOR = "#7F4F24";
const INACTIVE_COLOR = "#929299";

const getIconColor = (focused: boolean) =>
  focused ? ACTIVE_COLOR : INACTIVE_COLOR;

const TabsNavigation = () => {
  const { getTotalQuantity } = useCartManager();

  const totalQuantity = getTotalQuantity();

  return (
    <Tabs>
      <Tabs.Screen
        name="menu"
        options={{
          headerShown: false,
          title: "Menu",
          href: "/menu",
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
          href: "/offers",
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
          href: "/order",
          headerTitle: "Your Order",
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          tabBarIcon: ({ focused }) => (
            <View>
              <Entypo
                name="shopping-cart"
                size={24}
                color={getIconColor(focused)}
              />
              {totalQuantity !== 0 && (
                <View className="absolute -right-2 -top-1 h-4 w-4 items-center justify-center rounded-full bg-red-600">
                  <Text className="text-xs text-white">{totalQuantity}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsNavigation;
