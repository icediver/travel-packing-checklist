import { useModalStore } from "@/store/use-close-modal";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { PlusIcon } from "lucide-react-native";
import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  TouchableOpacityProperties,
  ModalProps,
} from "react-native";

export const buttonVariants = cva("rounded-md", {
  variants: {
    variant: {
      default: "mt-2.5  p-2.5  mx-3 bg-[#e74c3c]",
      dashed: "border border-dashed border-[#3498db] border-2  py-2",
      withPlusIcon: "h-12 w-12 justify-center items-center my-2 ",
      withOutTrigger: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props extends ModalProps, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  triggerClassName?: TouchableOpacityProperties["className"];
  triggerTitle?: string;
}

export function ModalContainer({
  children,
  variant,
  className,
  triggerClassName,
  triggerTitle,
  ...props
}: Props) {
  //const { isModalOpen, toggleModal } = useModalStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <View>
      <TouchableOpacity
        className={clsx(buttonVariants({ variant }), triggerClassName)}
        onPress={toggleModal}
      >
        {triggerTitle && (
          <Text className="text-center text-white text-lg">{triggerTitle}</Text>
        )}
        {variant === "withPlusIcon" && (
          <View className="h-8 w-8 rounded-full justify-center items-center border  border-[#3498db]">
            <PlusIcon
              size={20}
              color="#3498db"
            />
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={isModalOpen}
        transparent
        animationType="slide"
        className={clsx(className)}
        {...props}
      >
        <Pressable
          className="bg-[rgba(0,0,0,0.5)] flex-1 justify-center items-center"
          onPress={toggleModal}
        >
          <View className="w-4/5 bg-white rounded-xl p-5">
            <ModalContext.Provider value={{ toggleModal }}>
              {children}
            </ModalContext.Provider>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

interface ModalContextProps {
  toggleModal: () => void;
}

export const ModalContext = React.createContext<ModalContextProps>({
  toggleModal: () => {},
});
