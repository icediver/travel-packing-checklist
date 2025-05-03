import { LoaderIcon } from "lucide-react-native";
import { View } from "react-native";

export function LoaderComponent() {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="self-center animate-spin">
        <LoaderIcon
          color={"#fff"}
          size={35}
          className="animate-spin"
        />
      </View>
    </View>
  );
}
