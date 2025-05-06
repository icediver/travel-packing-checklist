import { SplashScreen, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

import { ActivityIndicator, Text, View } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { Suspense, useEffect } from "react";
import "../assets/styles/global.css";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { ClickOutsideProvider } from "react-native-click-outside";

export const DATABASE_NAME = "db.db";

const expo = SQLite.openDatabaseSync(DATABASE_NAME);
const db = drizzle(expo);

const queryClient = new QueryClient();

export default function RootLayout() {
  useDrizzleStudio(expo);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <>
      <ClickOutsideProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <Suspense fallback={<ActivityIndicator size="large" />}>
              <SQLiteProvider
                databaseName={DATABASE_NAME}
                options={{ enableChangeListener: true }}
                useSuspense
              >
                <StatusBar style="light" />
                <Stack
                  screenOptions={{
                    contentStyle: {
                      //paddingTop: inset.top,
                      backgroundColor: "black",
                    },
                    //headerBackButtonDisplayMode: "minimal",
                    //headerTransparent: true,
                  }}
                >
                  <Stack.Screen
                    name="(tabs)"
                    options={{
                      headerShown: false,
                      presentation: "modal",
                      //headerBackVisible: false,
                      //headerBackButtonDisplayMode: "minimal",
                    }}
                  />

                  <Stack.Screen name="+not-found" />
                </Stack>
              </SQLiteProvider>
            </Suspense>
          </SafeAreaProvider>
        </QueryClientProvider>
      </ClickOutsideProvider>
    </>
  );
}
