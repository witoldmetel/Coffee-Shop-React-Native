import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { CategoryWrapper } from "~/components";
import { useMenu } from "~/hooks/useMenu";

const MenuScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { menuItems, status, error } = useMenu({ searchQuery });

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
    <SafeAreaView className=" flex-1 bg-[#F2F2F7]">
      <Stack.Screen options={{ headerTitle: "Products" }} />
      <View style={styles.container}>
        <TextInput
          clearButtonMode="always"
          editable
          onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
          value={searchQuery}
          placeholder="Search"
          className="my-4 rounded-lg bg-[#E3E3E9] p-2"
        />
        <FlashList
          data={menuItems}
          keyExtractor={({ name }) => name}
          renderItem={({ item }) => <CategoryWrapper item={item} />}
          estimatedItemSize={260}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Image
                style={styles.image}
                source={require("../../../../assets/Logo/logo.png")}
                contentFit="contain"
                transition={1000}
                alt="coffee-shop-logo"
              />
            </View>
          )}
          ListFooterComponent={() => <View style={styles.footer} />}
        />
      </View>
    </SafeAreaView>
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
