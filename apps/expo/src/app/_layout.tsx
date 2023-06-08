import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";
import { CartManagerProvider } from "~/contexts/CartManagerContext";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <TRPCProvider>
      <CartManagerProvider>
        <SafeAreaProvider>
          {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
          <StatusBar />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#F2F2F7",
              },
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                // Hide the header for all other routes.
                headerShown: false,
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </CartManagerProvider>
    </TRPCProvider>
  );
};

export default RootLayout;
