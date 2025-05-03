import { FlatList, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  useCreateList,
  useDeleteList,
  useLists,
  useUpdateList,
} from "@/hooks/data-base/useList";
import { ListItem } from "@/components/ui/list/ListItem";
import { AddListModal } from "@/components/ui/forms/AddListModal";
import { LoaderComponent } from "@/components/ui/loader/Loader";

export default function ListsPage() {
  const { data, isLoading, isError } = useLists();
  const { mutate: create } = useCreateList();
  const { mutate: update } = useUpdateList();
  const { mutate: deleteList } = useDeleteList();

  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-900  pt-4 pb-20">
      {isLoading && <LoaderComponent />}
      {isError && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-indigo-200 text-lg">Something went wrong!</Text>
        </View>
      )}
      <View className="flex-1">
        {data && !!data.length && (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            className="flex-1 bg-gray-900 gap-4"
            numColumns={2}
            renderItem={({ item }) => (
              <View className="w-1/2  p-2">
                <ListItem {...item} />
              </View>
            )}
          />
        )}
      </View>
      <AddListModal />
    </View>
  );
}
