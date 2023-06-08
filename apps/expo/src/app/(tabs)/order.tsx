import React from "react";
import { Text, View } from "react-native";

import { useCartManager } from "~/hooks/useCartManager";

const OrderScreens = () => {
  const { orders } = useCartManager();

  return (
    <View>
      {orders.map((item) => (
        <Text key={item.productId}>{item.productName}</Text>
      ))}
    </View>
  );
};

export default OrderScreens;
