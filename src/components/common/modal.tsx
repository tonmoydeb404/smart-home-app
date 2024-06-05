import React, { ReactNode } from "react";
import { ModalProps, Modal as RNModal, View } from "react-native";

type Props = {
  open: boolean;
  onClose: () => any;
  children: ReactNode;
} & ModalProps;

const Modal = (props: Props) => {
  const { onClose, open, children, ...rest } = props;
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
      {...rest}
    >
      <View className="flex-1 bg-black/40 items-center justify-center">
        {children}
      </View>
    </RNModal>
  );
};

export default Modal;
