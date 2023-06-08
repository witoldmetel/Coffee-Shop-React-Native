import { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useRouter, useSearchParams } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { ProductImage } from "~/components";
import { useCartManager } from "~/hooks/useCartManager";
import { useMenu } from "~/hooks/useMenu";

const Product: React.FC = () => {
  const router = useRouter();
  const { id } = useSearchParams();
  const [count, setCount] = useState(0);
  const { addToCart } = useCartManager();

  const { productDetails } = useMenu(Number(id));

  if (!productDetails) return <SplashScreen />;

  const increase = () => {
    setCount((count) => count + 1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount((count) => count - 1);
    }
  };

  const getTotalPrice = (price: number): number => count * price;

  return (
    <SafeAreaView className=" flex-1 bg-[#F2F2F7]">
      <Stack.Screen
        options={{
          title: productDetails.name,
          headerStyle: { backgroundColor: "#fff" },
          headerLeft() {
            return (
              <Pressable
                className="flex-row items-center justify-between"
                onPress={router.back}
              >
                <Ionicons name="arrow-back-sharp" size={24} color="#7f4f24" />
                <Text className="color-[#7f4f24] ml-2">Products</Text>
              </Pressable>
            );
          },
          headerRight() {
            return <AntDesign name="hearto" size={24} color="#7f4f24" />;
          },
        }}
      />

      <View className="m-4 flex-1 items-center rounded-lg bg-[#fff] p-4">
        <ProductImage
          name={productDetails.name}
          url={productDetails.image}
          contentFit="contain"
          contentPosition="top"
          style={{ width: "100%", height: 180 }}
        />
        <Text className="py-2 text-3xl">{productDetails.name}</Text>
        <Text className="text-1xl py-2 text-center">
          {productDetails.description}
        </Text>
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-1xl py-2">{`$ ${productDetails.price.toFixed(
            2,
          )} ea`}</Text>
          <View className="my-8 flex-row rounded-lg bg-[#f2f2f7]">
            <Pressable className="p-2" onPress={decrease}>
              <AntDesign name="minus" size={24} color="black" />
            </Pressable>
            <View className="my-2 h-auto w-px bg-[#929299]" />
            <Pressable className="p-2" onPress={increase}>
              <AntDesign name="plus" size={24} color="black" />
            </Pressable>
          </View>
        </View>
        <Text className="py-2 text-center text-2xl font-bold">
          Subtotal ${getTotalPrice(productDetails.price).toFixed(2)}
        </Text>
        <Pressable
          className="my-8 w-full rounded-3xl bg-[#ebd7b3] p-4"
          disabled={count === 0}
          onPress={() =>
            addToCart(
              productDetails.id,
              productDetails.name,
              count,
              getTotalPrice(productDetails.price),
            )
          }
        >
          <Text className="text-1xl text-center">Add {count} to cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Product;
