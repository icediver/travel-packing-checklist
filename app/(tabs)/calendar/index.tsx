import { View, FlatList, Alert } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { Calendar, type DateData } from "react-native-calendars";
import { DateItem } from "@/components/ui/date-item/DateItem";
import {
  useCreateDate,
  useDates,
  useDeleteDateByDate,
} from "@/hooks/data-base/useDates";
import { CalendarSubbase } from "@/components/ui/calendar/CalendarSubbase";
import { AddEventModal } from "@/components/ui/modals/modal-choice-date/AddEventModal";
import { generateBoxShadowStyle } from "@/lib/shadow.utils";

export default function Index() {
  const [key, setKey] = useState(0);
  const { data: fetchedDates, isLoading, isError } = useDates();
  const { mutate: createDate, isError: isCreatingError } = useCreateDate();
  const { mutate: deleteDate, isError: isDeletingError } =
    useDeleteDateByDate();
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const selectedDates = fetchedDates?.map(({ date }) => date) || [];

  const marked = useMemo(() => {
    const dates = selectedDates.map((date) => ({
      [date]: {
        selected: true,
        //disableTouchEvent: true,
        selectedColor: "#5E60CE",
        selectedTextColor: "white",
      },
    }));
    return Object.assign({}, ...dates);
    //const marked = Object.assign({}, ...dates);
  }, [selectedDates]);

  const onDayPress = useCallback(
    (day: DateData) => {
      if (selectedDates.includes(day.dateString)) {
        try {
          Alert.alert(
            "Delete Item",
            "Are you sure you want to delete this event? You will not be able to recover this item!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
              },
              {
                text: "Confirm",
                onPress: async () => {
                  deleteDate(day.dateString);
                },
              },
            ],
            { cancelable: false },
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        //setSelectedDate([...selectedDate, day.dateString]);
        //createDate(day.dateString);
        setSelectedDate(day.dateString);
        setIsDateModalOpen(true);
      }
    },
    [selectedDates],
  );

  useFocusEffect(
    useCallback(() => {
      setKey((prevKey) => prevKey + 1);
    }, []),
  );

  return (
    <View className="flex-1 bg-slate-950 items-center justify-center">
      <Animated.View
        key={key}
        entering={SlideInDown}
        className="items-center justify-start bg-slate-900 h-full w-full px-8"
      >
        <View
          className="w-full    relative mt-8 rounded-2xl bg-indigo-950"
          style={{
            ...generateBoxShadowStyle({
              shadowColorAndroid: "rgba(224,217,255,0.3);",
              shadowOpacity: 0.01,
              shadowRadius: 3.84,
              elevation: 20,
            }),
          }}
        >
          <CalendarSubbase className="w-full h-full  absolute rounded-2xl" />
          {/*<BlurView
            intensity={200}
            tint="dark"
            experimentalBlurMethod={"dimezisBlurView"}
          >*/}
          <Calendar
            style={{
              width: "100%",
              //color: "white",
              //selfAlign: "center",
              flexGrow: 1,
              borderRadius: 8,
              overflow: "hidden",
              marginVertical: 20,
            }}
            theme={{
              calendarBackground: "rgba(0, 0, 0, 0)",
              textSectionTitleColor: "white",
              dayTextColor: "rgba(255, 255, 255, 0.4)",
              monthTextColor: "white",
            }}
            onDayPress={onDayPress}
            markedDates={marked}
          />
          {/*
          </BlurView>
*/}
        </View>
        {/*<SkeletonRect
          height={40}
          className="mb-2 mt-6"
        />
        <SkeletonRect
          height={40}
          className="my-2"
        />
        <View className="w-full flex-row gap-4 my-2 items-center">
          <SkeletonRect
            width={40}
            height={40}
            className="rounded-full"
          />
          <SkeletonRect
            height={40}
            className="flex-1"
          />
        </View>*/}
        <View className="flex-1  w-full pt-8">
          <FlatList
            data={fetchedDates}
            renderItem={({ item }) => <DateItem date={item} />}
            keyExtractor={(item) => item.date}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          />
        </View>
        <AddEventModal
          isModalOpen={isDateModalOpen}
          setIsModalOpen={setIsDateModalOpen}
          date={selectedDate}
        />
      </Animated.View>
    </View>
  );
}
