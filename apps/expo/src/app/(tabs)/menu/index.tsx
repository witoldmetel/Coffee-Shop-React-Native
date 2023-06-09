import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { CategoryWrapper, MenuListHeader } from "~/components";
import { useMenu } from "~/hooks/useMenu";

const MenuScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { menuItems, status, error } = useMenu({ searchQuery });

  if (status === "loading")
    return (
      <ActivityIndicator className="flex-1" size="large" color="#410413" />
    );

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
          ListHeaderComponent={<MenuListHeader />}
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
