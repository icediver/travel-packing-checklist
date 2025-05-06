import { ListType } from "@/db/schema";
import { useShakeAnimation } from "@/hooks/animations/useShakeAnimation";
import { Link } from "expo-router";
import { XIcon } from "lucide-react-native";
import { useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useClickOutside } from "react-native-click-outside";

interface Props extends ListType {}

export function ListItem({ id, name }: Props) {
  const [isShaking, setIsShaking] = useState(false);
  const { start, stop, animationStyle } = useShakeAnimation(2, 50);

  const ref = useClickOutside<View>(() => {
    stopShaking();
  });

  const startShaking = () => {
    setIsShaking(true);
    start();
  };

  const stopShaking = () => {
    setIsShaking(false);
    stop();
  };

  return (
    <Animated.View
      ref={ref}
      style={animationStyle}
    >
      <Link
        href={`/list/${id}`}
        push
        asChild
      >
        <TouchableOpacity
          className="p-2.5 rounded-md bg-blue-500 z-10"
          onLongPress={startShaking}
          activeOpacity={0.7}
        >
          <Text className="text-center text-white text-lg font-semibold capitalize">
            {name}
          </Text>
          {isShaking && (
            <TouchableOpacity
              className="absolute top-2 right-2 z-50 p-1"
              onPress={stopShaking}
            >
              <XIcon
                size={20}
                color="white"
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
}
