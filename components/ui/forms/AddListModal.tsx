import { COLORS } from "@/constants/colors.constants";
import { ListType } from "@/db/schema";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { Field } from "./fields/Field";
import { useForm } from "react-hook-form";
import { useCreateList } from "@/hooks/data-base/useList";
import { ModalContainer, ModalContext } from "../modals/ModalContainer";
import { useModalStore } from "@/store/use-close-modal";

export function AddListModal() {
  return (
    <ModalContainer
      triggerClassName="mb-10"
      triggerTitle="Add New List"
    >
      <ModalContent />
    </ModalContainer>
  );
}

function ModalContent() {
  const { handleSubmit, reset, control } = useForm<ListType>({
    mode: "onChange",
  });

  const { toggleModal } = useContext(ModalContext);

  const { mutate } = useCreateList();

  function onSubmit(data: ListType) {
    console.log(data);

    try {
      mutate(data);
      toggleModal();
      reset();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  }

  return (
    <>
      <View className="flex-row w-full  items-center">
        <Text className="text-indigo-800 text-lg w-1/3 mb-4">List Name: </Text>
        <Field
          control={control}
          name="name"
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
        <Text className="text-center text-white text-lg">Add List</Text>
      </TouchableOpacity>
    </>
  );
}
