import { Stack } from "expo-router/stack";
import { View } from "react-native";
import { getHeaderTitle, Header } from "@react-navigation/elements";

export default function NotificationsLayout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          header: ({ options, route, back }) => (
            <View className="flex-row justify-center items-center w-full relative bg-indigo-950 h-20 ">
              <Header
                back={back}
                title={getHeaderTitle(options, route.name)}
                headerTintColor="white"
                headerTitleContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -45,
                }}
                headerTransparent={true}
              />
            </View>
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Notifications" }}
        />
      </Stack>
    </View>
  );
}
