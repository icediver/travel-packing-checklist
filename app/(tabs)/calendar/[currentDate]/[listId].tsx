import { TaskItem } from "@/components/ui/task-item/TaskItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { LoaderComponent } from "@/components/ui/loader/Loader";
import { useList } from "@/hooks/data-base/useList";
import { useCompletedTasks } from "@/hooks/data-base/useCompletedTasks";

export default function ListScreen() {
  const { listId: id, currentDate: date } = useLocalSearchParams();
  const { data, isLoading, isError } = useList(+id);

  if (isLoading) return <LoaderComponent />;
  if (isError || !data) return <Text>Something went wrong!</Text>;

  //const { data: completedTasks } = useCompletedTasks();

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
        renderItem={({ item }) => {
          return (
            <TaskItem
              task={item}
              dateString={date as string}
            />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text className="text-white text-lg">{date}</Text>
    </View>
  );
}
