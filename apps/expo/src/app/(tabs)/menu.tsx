import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";

import { CategoryWrapper } from "~/components";
import { useMenu } from "~/hooks/useMenu";

const MenuScreen = () => {
  const { menuItems, status, error } = useMenu();

  if (status === "loading") return <Text>Loading...</Text>;
  if (status === "error")
    return (
      <Text>
        {typeof error === "object"
          ? JSON.stringify(error)
          : "Cannot fetch data from the server"}
      </Text>
    );

  return (
    <View style={styles.container}>
      <FlashList
        data={menuItems}
        keyExtractor={({ name }) => name}
        renderItem={({ item }) => <CategoryWrapper item={item} />}
        estimatedItemSize={260}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={require("../../../assets/Logo/logo.png")}
              contentFit="contain"
              transition={1000}
              alt="coffee-shop-logo"
            />
          </View>
        )}
        ListFooterComponent={() => <View style={styles.footer} />}
      />
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  header: {
    height: 50,
    backgroundColor: "#43281C",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: "flex-start",
  },
  image: {
    flex: 1,
    width: "100%",
  },
  footer: {
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
