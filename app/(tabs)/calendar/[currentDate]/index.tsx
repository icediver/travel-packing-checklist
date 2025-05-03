import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { LoaderComponent } from "@/components/ui/loader/Loader";
import { useDates } from "@/hooks/data-base/useDates";
import { useEventByDate } from "@/hooks/data-base/useEvents";
import { ListEventItem } from "@/components/ui/calendar/list-event-item/ListEventItem";

export default function CalendarScreen() {
  const { currentDate: date } = useLocalSearchParams<{ currentDate: string }>();

  const { data: dates } = useDates();

  const event = dates?.find((item) => item.date === date);
  if (!event) return <Text>Something went wrong!</Text>;

  const { data, isLoading, isError } = useEventByDate(date);

  if (isLoading) return <LoaderComponent />;
  if (isError || !data) return <Text>Something went wrong!</Text>;
  if (isError || !data) return <Text>Something went wrong!</Text>;

  return (
    <View className="flex-1 w-full bg-slate-950   justify-center items-center">
      <Stack.Screen
        options={{
          headerTitle: `${date}`,
          headerTitleAlign: "center",
        }}
      />

      <FlatList
        numColumns={2}
        className="flex-1 bg-gray-900 w-full gap-4"
        data={data.map((e) => {
          return e.list;
        })}
        renderItem={({ item }) => (
          <View className="w-1/2  p-2">
            <ListEventItem
              id={item.id}
              name={item.name}
              date={date}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
