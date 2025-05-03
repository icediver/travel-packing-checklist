import { Controller, FieldValues } from "react-hook-form";
import { ICheckboxField, IField } from "./field.interface";
import { Pressable, Text, View } from "react-native";
import { TextInput } from "react-native";

import { clsx } from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import Checkbox from "expo-checkbox";

interface Props<T extends FieldValues> extends ICheckboxField<T> {}

export function CheckboxField<T extends Record<string, any>>({
  control,
  name,
  rules,
  className,
  ...rest
  //}: IField<T>): JSX.Element {
}: Props<T>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <Pressable
          className="items-start w-full"
          onPress={onChange}
        >
          <View className="w-full border-b pb-4 border-gray-300 flex-row justify-start items-center gap-8">
            <Checkbox
              value={value}
              onValueChange={onChange}
              {...rest}
            />
            <Text className="text-lg">{name}</Text>
          </View>

          <View className="h-4 w-full">
            {error && (
              <Text className="text-red-700 text-sm">{error.message}</Text>
            )}
          </View>
        </Pressable>
      )}
    />
  );
}
