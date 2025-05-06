import { Stack } from "expo-router/stack";
import { View } from "react-native";
import { getHeaderTitle, Header } from "@react-navigation/elements";

export default function CalendarLayout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          //headerTitleAlign: "center",

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
                  width: "80%",
                }}
                headerTransparent={true}
                headerLeftContainerStyle={{
                  marginTop: -45,
                }}
              />
            </View>
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Calendar" }}
        />
      </Stack>
    </View>
  );
}
