import { LucideCloudCog } from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
import { DEVICE_HOST } from "../../../config";
import useHome from "../../../hooks/contexts/use-home";

type Props = {};

const OptionsBtn = (props: Props) => {
  const { updateHost } = useHome();
  const [dialog, setDialog] = useState(false);
  const [host, setHost] = useState("");

  const handleClose = () => {
    setHost("");
    setDialog(false);
  };

  const handleConfirm = () => {
    if (!host) return;

    updateHost(host);
    handleClose();
  };

  const handleReset = () => {
    updateHost(DEVICE_HOST);
    handleClose();
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setDialog(true)}
        className={"bg-blue-600/30 p-2 rounded-lg"}
      >
        <LucideCloudCog size={24} className={"text-blue-600"} />
      </TouchableOpacity>
      <Dialog.Container
        visible={dialog}
        onRequestClose={handleClose}
        onBackdropPress={handleClose}
      >
        <Dialog.Title className="text-slate-900">Host Name</Dialog.Title>
        <Dialog.Description className="text-slate-700 mb-5">
          Update app host name
        </Dialog.Description>

        <Dialog.Input value={host} onChangeText={setHost} />
        <View className="flex-row items-center justify-between">
          <Dialog.Button
            label="Reset"
            onPress={handleReset}
            className="mr-auto text-red-600"
          />
          <View className="flex-row items-center ">
            <Dialog.Button label="Cancel" onPress={handleClose} />
            <Dialog.Button label="Confirm" onPress={handleConfirm} />
          </View>
        </View>
      </Dialog.Container>
    </>
  );
};

export default OptionsBtn;
