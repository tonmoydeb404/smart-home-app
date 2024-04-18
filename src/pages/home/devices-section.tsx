import React from "react";
import { FlatList, Text } from "react-native";
import DeviceCard from "../../components/device-card";
import useHome from "../../hooks/contexts/use-home";

const DevicesSection = () => {
  const { devices, updateDevice } = useHome();

  return (
    <>
      <Text className="text-slate-300 uppercase font-medium text-sm mb-3">
        Devices
      </Text>

      <FlatList
        data={devices}
        className="pb-20 "
        renderItem={({ index, item }) => (
          <DeviceCard
            index={index}
            currentStatus={item}
            key={index}
            cardProps={{
              pressable: true,
              onPress: () => updateDevice(index, !item),
            }}
          />
        )}
        keyExtractor={(_item, index) => index.toString()}
        numColumns={2}
        horizontal={false}
      />
    </>
  );
};

export default DevicesSection;
