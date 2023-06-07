import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import { type MenuItemType, type ProductType } from "../../../../types";

type ProductWrapperProps = {
  item: MenuItemType;
};

const ProductWrapper = ({ item }: ProductWrapperProps) => {
  const getImage = (url: string) =>
    `https://firtman.github.io/coffeemasters/api/images/${url}`;

  const renderItem = (item: ProductType) => {
    console.log("file: menu.tsx:16 ~ MenuScreen ~ item:", item);
    return (
      <Link key={item.id} href={`/product/${item.id}`} asChild>
        <Pressable style={styles.itemContainer}>
          <Text>{item.name}</Text>
        </Pressable>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{item.name}</Text>
      </View>
      {item.products.map((product) => renderItem(product))}
    </View>
  );
};

export default ProductWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  category: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
});
