import {
  Text,
  TouchableOpacity,
  TouchableOpacityProperties,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TypeIonicons } from "@/types/icon.types";

const buttonVariants = cva("self-center", {
  variants: {
    variant: {
      default: "",
      secondary:
        "bg-[#998beb] flex w-24 h-24 rounded-full items-center justify-center",
    },
  },
});

export interface INavbarButton
  extends TouchableOpacityProperties,
    VariantProps<typeof buttonVariants> {
  icon?: TypeIonicons;
  iconActive?: TypeIonicons;
  className?: string;
  children?: React.ReactNode;
  isActive?: boolean;
}

export function NavbarButton({
  className,
  icon,
  iconActive,
  children,
  variant = "default",
  isActive,
  ...props
}: INavbarButton) {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {icon && (
        <Ionicons
          name={isActive ? iconActive : icon}
          size={variant === "secondary" ? 48 : 36}
          color={
            variant === "secondary"
              ? "rgba(255, 255, 255, 0.9)"
              : isActive
                ? "#998beb"
                : "#a7a7a7"
          }
          className="flex justify-center items-center"
        />
      )}
    </TouchableOpacity>
  );
}
