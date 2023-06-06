import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import { useMenu } from "~/hooks/useMenu";

const MenuScreen = () => {
  const [menuItems, status, error] = useMenu();

  if (status === "loading") return <Text>Loading...</Text>;
  if (status === "error")
    return (
      <Text>
        {typeof error === "object"
          ? JSON.stringify(error)
          : "Cannot fetch data from the server"}
      </Text>
    );

  const getImage = (url: string) =>
    `https://firtman.github.io/coffeemasters/api/images/${url}`;

  const renderItem = ({ item }: { item: any }) => {
    console.log("file: menu.tsx:16 ~ MenuScreen ~ item:", item);
    return (
      <Link href={`/product/${item.id}`} asChild>
        <Pressable style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
        </Pressable>
      </Link>
    );
  };

  return (
    <View>
      <FlatList
        data={menuItems}
        keyExtractor={({ name }) => name}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
