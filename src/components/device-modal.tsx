import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import deviceIcons from "../data/device-icons";
import useHome from "../hooks/contexts/use-home";
import { DeviceDetails } from "../types/home";
import Button from "./common/button";
import { Card, CardBody } from "./common/card";
import Modal from "./common/modal";

type Props = {
  open: boolean;
  onClose: () => any;
  data?: DeviceDetails | null;
};

const DeviceModal = (props: Props) => {
  const { onClose, open, data } = props;

  const { updateDeviceDetails } = useHome();

  // app states
  const [deviceName, setDeviceName] = useState(data?.title || "");
  const [deviceIcon, setDeviceIcon] = useState(data?.icon || undefined);

  // handlers
  const handleUpdate = async () => {
    if (!data) return onClose();

    await updateDeviceDetails(data.index, {
      ...data,
      title: deviceName,
      icon: deviceIcon || "",
    });

    onClose();
  };

  useEffect(() => {
    if (open) {
      setDeviceName(data?.title || "");
      setDeviceIcon(data?.icon);
    } else {
      setDeviceName("");
      setDeviceIcon(undefined);
    }
  }, [data?.title, data?.icon, open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Card className="max-w-[80%] w-full bg-slate-800 p-3">
        <CardBody>
          <Text className="text-xl font-bold text-white mb-5">
            Customize Device
          </Text>

          <Text className="text-slate-200 text-xs uppercase font-bold mb-1">
            Name
          </Text>
          <TextInput
            value={deviceName}
            className="border border-slate-700 py-1 px-3 text-white mb-3"
            onChangeText={(text) => setDeviceName(text)}
          />

          <Text className="text-slate-200 text-xs uppercase font-bold mb-1">
            Icon
          </Text>
          <FlatList
            data={deviceIcons}
            horizontal={false}
            numColumns={5}
            className="w-full"
            renderItem={({ item }) => {
              const Icon = item.icon;
              return (
                <Pressable
                  key={item.key}
                  className={`p-2  rounded mx-0.5 my-0.5 ${
                    deviceIcon === item.key
                      ? "bg-blue-600 active:bg-blue-700"
                      : "bg-slate-600 active:bg-slate-500"
                  }`}
                  onPress={() => setDeviceIcon(item.key)}
                >
                  <Icon size={28} className="text-gray-50" />
                </Pressable>
              );
            }}
          />

          <View className="mb-5" />

          <Button
            label="Save Changes"
            className="mb-2"
            onPress={handleUpdate}
          />
          <Button label="Close" variant="base" onPress={onClose} />
        </CardBody>
      </Card>
    </Modal>
  );
};

export default DeviceModal;
