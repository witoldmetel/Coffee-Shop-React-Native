import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { type MenuItemType, type ProductType } from "../../../../types";

type CategoryWrapperProps = {
  item: MenuItemType;
};

const CategoryWrapper = ({ item }: CategoryWrapperProps) => {
  const getImage = (url: string) =>
    `https://firtman.github.io/coffeemasters/api/images/${url}`;

  const productItem = (product: ProductType) => {
    return (
      <View style={styles.productContainer}>
        <Link key={product.id} href={`/product/${product.id}`} asChild>
          <Pressable style={styles.itemContent}>
            <Image
              style={styles.image}
              source={getImage(product.image)}
              contentFit="cover"
              transition={1000}
              alt={`${product.name}-image`}
            />
            <View style={styles.infoSection}>
              <View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text>{`$ ${product.price.toFixed(2)}`}</Text>
              </View>
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </Pressable>
        </Link>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{item.name}</Text>
      </View>
      {item.products.map((product) => productItem(product))}
    </View>
  );
};

export default CategoryWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    padding: 24,
    backgroundColor: "#EDE0D4",
  },
  category: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#410413",
  },
  productContainer: {
    margin: 16,
    backgroundColor: "#ede0d4",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  itemContent: {
    flex: 1,
    height: 200,
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoSection: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    fontWeight: "500",
    fontSize: 22,
    marginBottom: 4,
  },
});
