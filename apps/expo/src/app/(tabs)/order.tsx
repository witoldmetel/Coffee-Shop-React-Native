import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import { useCartManager } from "~/hooks/useCartManager";

const OrderScreen = () => {
  const { orders, getTotalPrice, removeFromCart } = useCartManager();
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");

  if (!orders || orders.length === 0) {
    return (
      <View className="my-4 flex-1 items-center justify-center ">
        <Text className="my-4 text-lg font-semibold text-black">
          You don&apos;t have any orders
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-8">
      <Text className="my-4 ml-4 font-semibold text-gray-400">ITEMS</Text>
      <View className="rounded-lg bg-[#ede0d4] p-4">
        {orders.map((item, index) => (
          <View key={item.productId}>
            <View className="flex-row items-center justify-between bg-[#ede0d4] py-4">
              <Text className="font-semibold">{`${item.quantity}x ${item.productName}`}</Text>
              <View className="flex-row items-center">
                <Text className="mr-2">$ {item.totalPrice.toFixed(2)}</Text>
                <Pressable onPress={() => removeFromCart(item.productId)}>
                  <EvilIcons name="trash" size={24} color="#dd3a0a" />
                </Pressable>
              </View>
            </View>
            {index !== orders.length - 1 && (
              <View className="my-2 h-px w-full bg-[#929299]" />
            )}
          </View>
        ))}
      </View>
      <Text className="my-4 ml-4 font-semibold text-gray-400">
        YOUR DETAILS
      </Text>
      <View className="rounded-lg bg-[#ede0d4] px-4">
        <TextInput
          editable
          onChangeText={(userName) => setUserName(userName)}
          value={userName}
          placeholder="Your Name"
          className="my-4 bg-white p-2"
        />
        <TextInput
          editable
          onChangeText={(phone) => setPhone(phone)}
          value={phone}
          placeholder="Your Phone"
          className=" mb-4 bg-white p-2"
        />
      </View>
      <View className="flex-row items-center justify-center py-8">
        <Text className="mr-8">Total</Text>
        <Text className="font-semibold">$ {getTotalPrice()}</Text>
      </View>
      <Pressable
        className="mb-12 w-full rounded-3xl bg-[#DDB892] p-4"
        onPress={() => console.log("Order")}
      >
        <Text className="text-1xl text-center">Place Order</Text>
      </Pressable>
    </ScrollView>
  );
};

export default OrderScreen;
