import { TaskItem } from "@/components/ui/task-item/TaskItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { LoaderComponent } from "@/components/ui/loader/Loader";
import { useList } from "@/hooks/data-base/useList";

export default function ListScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError } = useList(+id);

  if (isLoading) return <LoaderComponent />;
  if (isError || !data) return <Text>Something went wrong!</Text>;

  return (
    <View className="flex-1 bg-gray-900  pt-4 ">
      <Stack.Screen
        options={{
          headerTitle: `${data.name}`,
          headerTitleAlign: "center",
        }}
      />

      <FlatList
        data={data.tasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
