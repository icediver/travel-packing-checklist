import { Tabs } from "expo-router";
import { View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { AddTaskButton } from "@/components/ui/buttons/AddTaskButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { AddItemModal } from "@/components/ui/add-item-modal/AddItemModal";
import { useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Badge } from "@/components/ui/badge/Badge";

export default function TabLayout() {
  const [isShow, setIsShow] = useState(false);
  const inset = useSafeAreaInsets();
  const db = useSQLiteContext();
  //TODO: remove;
  useDrizzleStudio(db);
  //

  return (
    <View
      style={{
        paddingTop: inset.top,
        flex: 1,
      }}
    >
      <Tabs
        screenOptions={{
          //tabBarActiveTintColor: "#998beb",
          //headerShown: false,
          //tabBarButton: HapticTab,
          //tabBarBackground: TabBarBackground,
          //headerStyle: {
          //backgroundColor: "#0A0C1C",
          //margin: -inset.top,
          //height: 40,
          //backgroundColor: COLORS.dangerButton,
          //},
          //headerTitleAlign: "center",
          //headerTitleContainerStyle: {
          //flex: 1,
          //height: 40,
          //justifyContent: "center",
          //alignItems: "center",
          //marginTop: -inset.top,
          //},
          //headerTitleStyle: {
          //color: "white",
          //},
          headerShown: false,

          tabBarStyle: {
            backgroundColor: "#0A0C1C",
            height: 60,
            position: "absolute",
            zIndex: 100,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons
                size={28}
                name="home"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color }) => (
              <Ionicons
                size={28}
                name="calendar"
                color={color}
                style={{ right: 3 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            tabBarLabelStyle: { display: "none" },

            tabBarIcon: ({ color }) => (
              <AddTaskButton
                icon="add"
                variant="secondary"
                onPress={(e) => {
                  e.preventDefault();
                  //router.push("/create/modal");
                  setIsShow(!isShow);
                }}
              />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("create");
            },
          })}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "notify",
            tabBarIcon: ({ color }) => (
              <View>
                <Badge />
                <Ionicons
                  size={28}
                  name="notifications"
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons
                size={28}
                name="person"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      {isShow && <AddItemModal closeModal={() => setIsShow(false)} />}
    </View>
  );
}
