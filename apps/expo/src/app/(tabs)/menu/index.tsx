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

  // @todo: Problem with re-rendering when type sth in search bar
  const ListHeader = () => {
    return (
      <View style={styles.header}>
        <Image
          className="w-full flex-1"
          source={require("../../../../assets/Logo/logo.png")}
          contentFit="contain"
          transition={1000}
          alt="coffee-shop-logo"
        />
      </View>
    );
  };

  return (
    <SafeAreaView className=" flex-1 bg-[#F2F2F7]">
      <Stack.Screen options={{ headerTitle: "Products" }} />
      <View style={styles.container}>
        <TextInput
          clearButtonMode="always"
          editable
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search"
          className="my-4 rounded-lg bg-[#E3E3E9] p-2"
        />
        <FlashList
          data={menuItems}
          keyExtractor={({ name }) => name}
          renderItem={({ item }) => <CategoryWrapper item={item} />}
          estimatedItemSize={260}
          ListHeaderComponent={<ListHeader />}
          ListFooterComponent={<View style={styles.footer} />}
          ListEmptyComponent={
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>
                We don&apos;t have such thing in our store
              </Text>
            </View>
          }
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
  footer: {
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  categoryContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  category: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#410413",
  },
});
