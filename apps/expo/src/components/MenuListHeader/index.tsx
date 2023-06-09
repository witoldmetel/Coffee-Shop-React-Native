import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";

const MenuListHeader = () => {
  return (
    <View className="h-12 justify-start rounded-t-lg bg-[#43281C] p-4">
      <Image
        className="w-full flex-1"
        source={require("../../../assets/Logo/logo.png")}
        contentFit="contain"
        transition={1000}
        alt="coffee-shop-logo"
      />
    </View>
  );
};

export default MenuListHeader;
