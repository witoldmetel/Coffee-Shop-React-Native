import { Pressable, SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useRouter, useSearchParams } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { ProductImage } from "~/components";
import { useMenu } from "~/hooks/useMenu";

const Product: React.FC = () => {
  const router = useRouter();
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { productDetails } = useMenu(Number(id));

  if (!productDetails) return <SplashScreen />;

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
          style={{ width: "100%", aspectRatio: 1 }}
        />
        <Text className="py-2 text-3xl">{productDetails.name}</Text>
        <Text className="text-1xl py-2 text-center">
          {productDetails.description}
        </Text>
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-1xl py-2">{`$ ${productDetails.price.toFixed(
            2,
          )} ea`}</Text>
          <Text className="text-1xl py-2">{productDetails.name}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Product;
