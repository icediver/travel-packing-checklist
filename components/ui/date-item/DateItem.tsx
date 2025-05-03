import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ModalListChoice } from "../forms/ModalListChoice";
import { type DateType } from "@/db/schema";

interface Props {
  date: DateType;
}

export function DateItem({ date }: Props) {
  //function onPress() {
  //  console.log("pressed", date);
  //}
  return (
    <View className="flex-row w-full justify-between items-center gap-8 px-2 border my-2 border-indigo-400 rounded-lg">
      <Link
        //href={`/calendar/date/${date}`}
        href={{
          pathname: "/calendar/[currentDate]",
          params: { currentDate: date.date },
        }}
        push
        asChild
      >
        <Pressable
          className="p-2"
          //onPress={onPress}
        >
          <View className="flex-row w-4/5 gap-4 justify-center">
            <Text className="text-indigo-400 font-semibold text-md">
              {date.date}
            </Text>
            <Text className="text-indigo-400 text-md font-semibold">
              {date.title}
            </Text>
          </View>
        </Pressable>
      </Link>
      <ModalListChoice
        value={0}
        onChange={(item) => console.log(item)}
        date={date}
      />
    </View>
  );
}
