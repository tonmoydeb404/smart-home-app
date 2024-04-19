import React from "react";
import { Text } from "react-native";
import { SimpleGrid } from "react-native-super-grid";
import DeviceCard from "../../components/device-card";
import useHome from "../../hooks/contexts/use-home";

const DevicesSection = () => {
  const { devices, updateDevice } = useHome();

  return (
    <>
      <Text className="text-slate-300 uppercase font-medium text-sm mb-3">
        Devices
      </Text>

      <SimpleGrid
        listKey={"devices"}
        data={devices}
        spacing={10}
        maxItemsPerRow={2}
        renderItem={({ item, index }) => (
          <DeviceCard
            index={index}
            currentStatus={item}
            key={index}
            cardProps={{
              pressable: true,
              onPress: () => updateDevice(index, !item),
              className: "w-full",
            }}
          />
        )}
      />
    </>
  );
};

export default DevicesSection;
