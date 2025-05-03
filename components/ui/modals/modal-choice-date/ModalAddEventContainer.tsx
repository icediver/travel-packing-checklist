import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React from "react";
import {
  View,
  Modal,
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
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalAddEventContainer({
  children,
  variant,
  className,
  triggerClassName,
  triggerTitle,
  isModalOpen,
  setIsModalOpen,
  ...props
}: Props) {
  //const { isModalOpen, toggleModal } = useModalStore();

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <View>
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
            <ModalEventContext.Provider value={{ toggleModal }}>
              {children}
            </ModalEventContext.Provider>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

interface ModalEventContextProps {
  toggleModal: () => void;
}

export const ModalEventContext = React.createContext<ModalEventContextProps>({
  toggleModal: () => {},
});
