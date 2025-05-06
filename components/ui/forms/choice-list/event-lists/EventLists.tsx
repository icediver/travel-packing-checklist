import { Pressable, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { DateType, events, eventsRelations, ListType } from "@/db/schema";
import { useState } from "react";
import {
  useDeleteEvent,
  useEventInsertList,
  useEvents,
} from "@/hooks/data-base/useEvents";

interface Props {
  list: ListType;
  checked: boolean;
  date: DateType;
}

export function EventLists({ list, date, checked }: Props) {
  const [isChecked, setIsChecked] = useState(checked);
  const { mutate: addList } = useEventInsertList();
  const { mutate: deleteEvent } = useDeleteEvent({
    date,
    listId: list.id,
  });
  function onValueChange() {
    console.log(isChecked);

    if (!isChecked) {
      try {
        addList({
          dateId: date.id,
          listId: list.id,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        deleteEvent();
      } catch (error) {
        console.log(error);
      }
    }
    setIsChecked(!isChecked);
  }
  return (
    <Pressable onPress={onValueChange}>
      <View className="w-full border-b py-4 border-gray-300 flex-row justify-start items-center gap-8">
        <Checkbox
          value={isChecked}
          onValueChange={onValueChange}
        />
        <Text className="text-lg">{list.name}</Text>
      </View>
    </Pressable>
  );
}
