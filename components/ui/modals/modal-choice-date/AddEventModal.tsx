import { COLORS } from "@/constants/colors.constants";
import { DateType, ListType } from "@/db/schema";
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useForm } from "react-hook-form";
import {
  ModalAddEventContainer,
  ModalEventContext,
} from "./ModalAddEventContainer";
import { Field } from "../../forms/fields/Field";
import { useCreateDate } from "@/hooks/data-base/useDates";

export function AddEventModal({
  isModalOpen,
  setIsModalOpen,
  date,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  date: string;
}) {
  return (
    <ModalAddEventContainer
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <ModalContent date={date} />
    </ModalAddEventContainer>
  );
}

function ModalContent({ date }: { date: string }) {
  const { handleSubmit, reset, control } = useForm<DateType>({
    mode: "onChange",
  });

  const { toggleModal } = useContext(ModalEventContext);
  const { mutate, isError } = useCreateDate();

  function onSubmit(data: DateType) {
    console.log(data);

    try {
      mutate({ ...data, date });
      toggleModal();
      reset();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  }

  return (
    <>
      <Text className="text-indigo-800 text-lg mb-4 text-center">
        Date: {date}
      </Text>
      <View className="flex-row w-full  items-center">
        <Text className="text-indigo-800 text-lg w-1/3 mb-4">Event Name: </Text>
        <Field
          control={control}
          name="title"
          rules={{ required: true }}
          className="-left-1/2"
          variant={"light"}
        />
      </View>
      <TouchableOpacity
        style={{ backgroundColor: COLORS.dangerButton }}
        onPress={handleSubmit(onSubmit)}
        className="mt-2.5 p-2.5 rounded-md"
      >
        <Text className="text-center text-white text-lg">Add Event</Text>
      </TouchableOpacity>
    </>
  );
}
