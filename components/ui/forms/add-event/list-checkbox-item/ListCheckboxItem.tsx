import { ListType } from "@/db/schema";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  list: ListType;
}

export function ListCheckboxItem({ list }: Props) {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    console.log(isChecked);
  }, [isChecked]);
  return (
    <TouchableOpacity
      //style={styles.option}
      className="p-4 border-b  border-gray-300 flex-row justify-start items-center gap-8"
      onPress={() => setIsChecked(!isChecked)}
    >
      <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        //onChange={() => setIsChecked(!isChecked)}
      />
      <Text className="text-lg">{list.name}</Text>
    </TouchableOpacity>
  );
}
