import { Controller } from "react-hook-form";
import { IField } from "./field.interface";
import { Text, View } from "react-native";

import { clsx, type ClassValue } from "clsx";
import { ModalDropdown } from "../ModalDropdown";

export function DroopdownField<T extends Record<string, any>>({
  control,
  name,
  rules,
  className,
  label,
  ...rest
}: IField<T>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <View>
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-white text-base  capitalize text-nowrap">
              {label || name}
            </Text>
            <View className="w-2/3">
              <View
                className={clsx(
                  error ? "border-red-800" : "border-transparent",
                )}
              >
                <ModalDropdown
                  autoCapitalize="none"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  {...rest}
                />
              </View>
            </View>
          </View>
          <View className="left-1/3 h-4 w-full">
            {error && (
              <Text className="text-red-700 text-sm">{error.message}</Text>
            )}
          </View>
        </View>
      )}
    />
  );
}
