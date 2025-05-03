import {
  Pressable,
  Text,
  TouchableOpacity,
  TouchableOpacityProperties,
  View,
} from "react-native";
import clsx from "clsx";
import { Ionicons } from "@expo/vector-icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TypeIonicons } from "@/types/icon.types";
import { LinearGradient } from "expo-linear-gradient";

const buttonVariants = cva("self-center", {
  variants: {
    variant: {
      default: "",
      secondary:
        "bg-[#998beb] flex w-28 h-28 rounded-full items-center justify-center p-0",
    },
  },
});

export interface Props
  extends TouchableOpacityProperties,
    VariantProps<typeof buttonVariants> {
  icon?: TypeIonicons;
  className?: string;
}

export function AddTaskButton({
  className,
  icon,
  children,
  variant = "default",
  ...props
}: Props) {
  return (
    <TouchableOpacity
      className={cn(
        buttonVariants({ variant, className }),
        "overflow-hidden z-50",
      )}
      {...props}
      style={{ boxShadow: "0px 0px 0px 2px rgba(153, 139, 235, 0.8 )" }}
    >
      <LinearGradient colors={["#4c669f", "#998beb"]}>
        <View className="flex flex-1 w-36 h-36 rounded-2xl items-center justify-center">
          {icon && (
            <Ionicons
              name={icon}
              size={36}
              color={"rgba(255, 255, 255, 0.9)"}
              className="flex justify-center items-center"
            />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
