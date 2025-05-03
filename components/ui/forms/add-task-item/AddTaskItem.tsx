import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { Field } from "../fields/Field";
import SubmitButton from "../../buttons/SubmitButton";
import { DroopdownField } from "../fields/DropdownField";
import { TaskType } from "@/db/schema/tasks.schema";
import { useCreateTask } from "@/hooks/data-base/useTask";

interface Props {
  closeModal: () => void;
}

export function AddTaskItem({ closeModal }: Props) {
  const { mutate } = useCreateTask();

  const { handleSubmit, reset, control } = useForm<TaskType>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<TaskType> = async ({
    name,
    description,
    listId,
  }) => {
    try {
      mutate({ name, description, listId });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }

    closeModal();
    reset();
  };

  return (
    <View className="flex-1 w-full absolute pb-20 pt-8 ">
      <View className="flex-1 w-full items-center justify-start  px-8 gap-2">
        <Text className="text-white mb-4">Add Task Item</Text>
        <DroopdownField<TaskType>
          control={control}
          name="listId"
          label="List"
          rules={{ required: "List is required" }}
        />
        <Field<TaskType>
          control={control}
          name="name"
          rules={{ required: "Name of task is required" }}
        />
        <Field<TaskType>
          control={control}
          name="description"
        />
        <SubmitButton onPress={handleSubmit(onSubmit)}>Add new</SubmitButton>
      </View>
    </View>
  );
}
