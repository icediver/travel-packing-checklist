import { LoaderComponent } from "@/components/ui/loader/Loader";
import { useDatesByRange } from "@/hooks/data-base/useDates";
import { addDays } from "@/lib/date.utils";
import { useQueryClient } from "@tanstack/react-query";
import { Text, View } from "react-native";

export default function Notifications() {
  //const { data, isLoading, isError } = useDatesByRange(startDate, endDate);
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["dates-in-range"]);

  return (
    <View className="flex-1 bg-gray-900 justify-center items-center">
      <Text className="text-2xl text-white font-semibold">Notifications</Text>
      <Text className="text-white text-xl">
        {JSON.stringify(data, null, 2)}
      </Text>
    </View>
  );
}
