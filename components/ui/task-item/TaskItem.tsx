import { completedTasks, type TaskType } from "@/db/schema";
import {
  useAddCompletedTask,
  useCompletedTask,
  useDeleteCompletedTask,
} from "@/hooks/data-base/useCompletedTasks";
import { useDateByDate } from "@/hooks/data-base/useDates";
import { generateBoxShadowStyle } from "@/lib/shadow.utils";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import Animated, { FadeIn, FadeOutRight } from "react-native-reanimated";

interface Props {
  task: TaskType;
  dateString?: string;
}

export function TaskItem({ task, dateString }: Props) {
  const [isCompleted, setIsCompleted] = useState(false);

  //const { mutate: update, isError } = useUpdateTask();
  const { id, listId } = task;
  const { data: date } = useDateByDate(dateString || "");

  console.log(date);

  const { data: completedTask } = useCompletedTask({
    taskId: id,
    listId: listId,
    dateId: date?.id || 0,
  });

  const { mutate: deleteCompletedTask } = useDeleteCompletedTask();
  const { mutate: addCompletedTask } = useAddCompletedTask();

  useLayoutEffect(() => {
    setIsCompleted(!!completedTask);
  }, [completedTask]);

  function handleToggleComplete() {
    console.log("handleToggleComplete", date);
    if (!date) return;

    if (isCompleted) {
      deleteCompletedTask({
        taskId: id,
        listId: listId,
        date: date,
      });
    } else {
      console.log("addCompletedTask");

      addCompletedTask({
        taskId: id,
        listId: listId,
        dateId: date.id,
      });
    }

    setIsCompleted(!isCompleted);
    //update(updatedTask);
  }
  //const { mutate: deleteTask } = useDeleteTask();

  const handleDelete = async (id: number) => {
    try {
      Alert.alert(
        "Delete Item",
        "Are you sure you want to delete?, You will not be able to recover this item!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
          {
            text: "Confirm",
            onPress: async () => {
              //deleteTask(id);
            },
          },
        ],
        { cancelable: false },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const containerStyle = {
    backgroundColor: isCompleted ? "#373951" : "#1B1B2E",
    //opacity: value ? 0.7 : 1,
    ...generateBoxShadowStyle({
      shadowColorAndroid: "rgba(224,217,255,0.6);",
      shadowOpacity: 0.01,
      shadowRadius: 3.84,
      elevation: 20,
    }),
  };

  const sideBarStyle = {
    opacity: isCompleted ? 0.7 : 1,
  };

  const textStyle = { color: isCompleted ? "#595c69" : "white" };

  return (
    <Animated.View
      className="my-2 mx-4 pr-4  shadow-xl bg-gray-100 flex-row items-center rounded-lg gap-4 h-20"
      style={containerStyle}
      entering={FadeIn}
      exiting={FadeOutRight}
    >
      <View
        className="rounded-l-lg w-3 h-full bg-pink-500"
        style={{}}
      />
      <View className="justify-between  flex-1 flex-row items-center">
        <View className="flex-row items-center gap-4">
          <Switch
            disabled={!dateString}
            value={isCompleted}
            onValueChange={handleToggleComplete}
            thumbColor={isCompleted ? "#0A0B1C" : "white"}
            trackColor={{ true: "#181f2c" }}
          />
          <Text
            style={textStyle}
            className="my-4"
          >
            {task.name}
          </Text>
        </View>
        <Pressable
          onPress={() => handleDelete(task.id)}
          className="w-8 h-8 rounded-full items-center justify-center "
          disabled={!!dateString}
        >
          {({ pressed }) => (
            <Ionicons
              name="trash"
              size={24}
              color={pressed ? "#920B51" : "#595c69"}
            />
          )}
        </Pressable>
      </View>
    </Animated.View>
  );
}
