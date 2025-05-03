import { COLORS } from "@/constants/colors.constants";
import * as schema from "@/db/schema";
import { type ListType } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import { ModalContainer, ModalContext } from "../modals/ModalContainer";
import { useModalStore } from "@/store/use-close-modal";
import { useLists } from "@/hooks/data-base/useList";

interface Props {
  value: number;
  onChange: (item: number) => void;
}

export function ModalDropdown({ onChange, value }: Props) {
  const { data: lists, isError, isLoading } = useLists();
  //const { data: lists, isError } = useQuery({
  //  queryKey: ["lists"],
  //  queryFn: async () => {
  //    const lists = drizzleDb.select().from(schema.lists).all();
  //    return lists;
  //  },
  //});
  //const { toggleModal } = useModalStore();

  return (
    <ModalContainer
      variant="dashed"
      triggerTitle={
        lists?.find((item) => item.id === value)?.name || "Select an option"
      }
    >
      <Lists
        lists={lists ?? []}
        onChange={onChange}
      />
    </ModalContainer>
  );
}

function Lists({
  lists,
  onChange,
}: {
  lists: ListType[];
  onChange: (item: number) => void;
}) {
  const { toggleModal } = useContext(ModalContext);
  const handleSelect = (item: ListType) => {
    onChange(item.id);
    toggleModal();
  };

  return (
    <>
      <FlatList
        data={lists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            //style={styles.option}
            className="p-4 border-b  border-gray-300"
            onPress={() => handleSelect(item)}
          >
            <Text className="text-lg">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={{ backgroundColor: COLORS.dangerButton }}
        onPress={toggleModal}
        className="mt-2.5 p-2.5 rounded-md"
      >
        <Text className="text-center text-white text-lg">Close</Text>
      </TouchableOpacity>
    </>
  );
}
