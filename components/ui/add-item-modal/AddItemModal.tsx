import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { AddTaskItem } from "../forms/add-task-item/AddTaskItem";

interface Props {
  closeModal: () => void;
}

export function AddItemModal({ closeModal }: Props) {
  return (
    <View
      className="absolute top-0 bottom-0 left-0 right-0  justify-end"
      onTouchEnd={closeModal}
    >
      <Animated.View
        className="h-1/2 w-full z-50 bottom-10 rounded-t-2xl overflow-hidden"
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={{
          boxShadow: "0px 0px 0px 2px rgba(89, 92, 105, 0.6 )",
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <BlurView
          className="flex-1  justify-center items-center"
          intensity={60}
          tint="systemThinMaterialDark"
          experimentalBlurMethod={"dimezisBlurView"}
        >
          <LinearGradient
            colors={["#162456", "#2f0d68"]}
            style={{
              flex: 1,
              //borderTopLeftRadius: 20,
              //borderTopRightRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              opacity: 0.3,
            }}
          ></LinearGradient>

          <AddTaskItem closeModal={closeModal} />
        </BlurView>
      </Animated.View>
    </View>
  );
}
