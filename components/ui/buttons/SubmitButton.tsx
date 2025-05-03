import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, PressableProps, Text } from "react-native";

import { TypeIonicons } from "@/types/icon.types";
import { cn } from "@/lib/utils";

interface Props extends PressableProps {
  className?: string;
  icon?: TypeIonicons;
  children: React.ReactNode;
}

export default function SubmitButton({
  className,
  icon,
  children,
  ...rest
}: Props) {
  return (
    <Pressable
      className={cn("w-full", className)}
      {...rest}
    >
      <LinearGradient
        //start={{ x: 0, y: 0.75 }}
        //end={{ x: 1, y: 0.25 }}
        className={cn(!!icon && "flex-row")}
        colors={["#DC3F41", "#a6282b"]}
        style={{
          flex: 1,
          //borderTopLeftRadius: 20,
          //borderTopRightRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          paddingVertical: 12,
          overflow: "hidden",
          borderRadius: 8,
        }}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color="white"
          />
        )}
        <Text
          className={cn(
            "text-white text-center font-medium text-lg",
            !!icon && "ml-2",
          )}
        >
          {children}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
