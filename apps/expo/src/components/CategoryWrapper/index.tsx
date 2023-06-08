import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { type MenuItemType, type ProductType } from "../../../../types";
import ProductImage from "../ProductImage";

type CategoryWrapperProps = {
  item: MenuItemType;
};

const CategoryWrapper = ({ item }: CategoryWrapperProps) => {
  const productItem = (product: ProductType) => {
    return (
      <View key={product.id} style={styles.productContainer}>
        <Link key={product.id} href={`/menu/product/${product.id}`} asChild>
          <Pressable style={styles.itemContent}>
            <ProductImage
              name={product.name}
              url={product.image}
              className="w-full flex-1 rounded-t-lg"
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
      {item.products.length > 0 && (
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{item.name}</Text>
        </View>
      )}
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
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    height: 200,
    alignItems: "center",
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
