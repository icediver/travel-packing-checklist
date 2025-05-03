import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { DateType, ListType } from "@/db/schema";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ModalContext } from "../../modals/ModalContainer";
import { COLORS } from "@/constants/colors.constants";
import { EventLists } from "./event-lists/EventLists";
import { useEventByDate } from "@/hooks/data-base/useEvents";

interface Props {
  lists: ListType[];
  date: DateType;
}

export function ChoiceList({ lists, date }: Props) {
  const { toggleModal } = useContext(ModalContext);
  const { data } = useEventByDate(date.date);

  function onSubmit() {
    toggleModal();
  }

  return (
    <View className="w-full">
      <Text className="text-indigo-800 text-lg  mb-4">{date.date} </Text>
      <FlatList
        data={lists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const checked = data?.some(({ list }) => list.id === item.id);
          return (
            //<CheckboxField
            //  control={control}
            //  name={item.name}
            //  rules={{ required: true }}
            ///>
            <EventLists
              list={item}
              date={date}
              checked={checked || false}
            />
          );
        }}
      />
      <TouchableOpacity
        style={{ backgroundColor: COLORS.dangerButton }}
        onPress={onSubmit}
        className="mt-2.5 p-2.5 rounded-md"
      >
        <Text className="text-center text-white text-lg">Choice Lists</Text>
      </TouchableOpacity>
    </View>
  );
}
