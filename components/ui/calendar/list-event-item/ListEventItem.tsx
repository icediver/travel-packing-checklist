import { CompletedTasksType, ListType, TaskType } from "@/db/schema";
import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

interface Props extends ListType {
  date: string;
}

export function ListEventItem({ id, name, date }: Props) {
  return (
    <Link
      href={`/calendar/${date}/${id}`}
      push
      asChild
    >
      <TouchableOpacity
        //style={{ backgroundColor: COLORS.dangerButton }}
        className="p-2.5 rounded-md bg-blue-500"
      >
        <Text className="text-center text-white text-lg font-semibold capitalize">
          {name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
