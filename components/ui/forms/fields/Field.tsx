import { Controller, FieldValues } from "react-hook-form";
import { IField } from "./field.interface";
import { Text, View } from "react-native";
import { TextInput } from "react-native";

import { clsx } from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

export const fieldVariants = cva("rounded-md", {
  variants: {
    variant: {
      dark: "bg-[#1B1B2E] text-indigo-200 border-slate-700/50",
      light: "bg-indigo-100 text-indigo-800 border-indigo-200",
    },
  },
  defaultVariants: {
    variant: "dark",
  },
});

interface Props<T extends FieldValues>
  extends IField<T>,
    VariantProps<typeof fieldVariants> {}

export function Field<T extends Record<string, any>>({
  control,
  name,
  rules,
  className,
  variant,
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
        <View className="flex-row justify-between items-center w-full">
          <Text className="text-white text-base  capitalize text-nowrap">
            {name}
          </Text>
          <View className="w-2/3">
            <TextInput
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              className={clsx(
                "w-full   px-4 rounded-lg  border-2 ",
                fieldVariants({ variant }),
                error ? "border-red-800" : "border-transparent",
                className,
              )}
              {...rest}
              ref={ref}
            />
            <View className="h-4">
              {error && (
                <Text className="text-red-700 text-sm">{error.message}</Text>
              )}
            </View>
          </View>
        </View>
      )}
    />
  );
}
