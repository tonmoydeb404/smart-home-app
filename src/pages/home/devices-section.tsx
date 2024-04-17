import React from "react";
import { Text, View } from "react-native";
import DeviceCard from "../../components/device-card";
import useHome from "../../hooks/contexts/use-home";

const DevicesSection = () => {
  const { devices, updateDevice } = useHome();

  return (
    <>
      <Text className="uppercase font-medium text-sm mb-2">Devices</Text>
      <View className="flex flex-row flex-wrap gap-5">
        {devices.map((item, index) => (
          <DeviceCard index={index} currentStatus={item} key={index} />
        ))}
      </View>
    </>
  );
};

export default DevicesSection;
