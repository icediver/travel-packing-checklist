import { Stack } from "expo-router/stack";
import { View } from "react-native";
import { getHeaderTitle, Header } from "@react-navigation/elements";

export default function HomeLayout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          //headerShown: false,
          //headerStyle: {
          //  backgroundColor: COLORS.dashed,
          //},
          //headerTintColor: "#fff",
          //headerTitleStyle: {
          //fontWeight: "bold",
          //},

          headerTitleAlign: "center",
          header: ({ options, route, back }) => (
            <View className="flex-row justify-center items-center w-full relative bg-indigo-950 h-20 ">
              <Header
                back={back}
                title={getHeaderTitle(options, route.name)}
                headerTitleStyle={{
                  fontWeight: "bold",
                  color: "white",
                  fontFamily: "Inter_600SemiBold",
                }}
                headerTintColor="white"
                headerTitleContainerStyle={{
                  width: "80%",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingRight: back ? 70 : 0,
                  paddingLeft: back ? 0 : 30,
                  marginTop: -45,
                }}
                headerStyle={{
                  height: 40,
                }}
                headerLeftContainerStyle={{
                  marginTop: -45,
                }}
                headerBackTitleStyle={{
                  fontSize: 16,
                }}
                headerTransparent={true}
                //headerBackgroundContainerStyle={{
                //  position: "relative",
                //  width: "100%",
                //  height: 50,
                //  paddingVertical: 0,
                //  alignItems: "flex-start",
                //  justifyContent: "flex-start",
                //  zIndex: 80,
                //}}
              />
            </View>
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Lists" }}
        />
      </Stack>
    </View>
  );
}
