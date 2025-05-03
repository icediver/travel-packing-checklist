import { CheckboxProps } from "expo-checkbox";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { TextInputProps } from "react-native";

export interface IField<T extends FieldValues>
  extends Omit<TextInputProps, "onChange" | "onChangeText" | "value"> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export interface ICheckboxField<T extends FieldValues>
  extends Omit<CheckboxProps, "value" | "onValueChange"> {
  control: Control<T>;
  name: FieldPath<T>;
  checked?: boolean;
  label?: string;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}
