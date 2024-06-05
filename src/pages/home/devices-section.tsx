import { LucideBlinds } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";
import { SimpleGrid } from "react-native-super-grid";
import DeviceCard from "../../components/device-card";
import DeviceModal from "../../components/device-modal";
import { getDeviceIcon } from "../../data/device-icons";
import useHome from "../../hooks/contexts/use-home";
import useModal from "../../hooks/util/use-modal";
import { DeviceDetails } from "../../types/home";

const DevicesSection = () => {
  const { devices, updateDevice, windowStatus, devicesDetails } = useHome();

  const deviceModal = useModal<DeviceDetails | undefined>();

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
        renderItem={({ item, index }) => {
          const deviceDetails = devicesDetails.find((d) => d?.index === index);
          const Icon = getDeviceIcon(deviceDetails?.icon)?.icon;

          return (
            <DeviceCard
              index={index}
              currentStatus={item}
              key={index}
              cardProps={{
                pressable: true,
                onPress: () => updateDevice(index, !item),
                onLongPress: () =>
                  deviceModal.onOpen({
                    index,
                    title: deviceDetails?.title || `Device ${index + 1}`,
                    icon: deviceDetails?.icon || "power",
                  }),
                className: "w-full max-w-full",
              }}
              title={deviceDetails?.title}
              icon={Icon && <Icon size={32} className="text-gray-200" />}
            />
          );
        }}
      />

      <Text className="text-slate-300 uppercase font-medium text-sm mb-3">
        Others
      </Text>

      <DeviceCard
        index={8}
        currentStatus={!!windowStatus}
        title="Windows"
        icon={<LucideBlinds size={24} className="text-gray-200" />}
        cardProps={{
          pressable: true,
          onPress: () => updateDevice(8, !windowStatus),
        }}
      />

      <DeviceModal
        open={deviceModal.open}
        onClose={deviceModal.onClose}
        data={deviceModal.data}
      />
    </>
  );
};

export default DevicesSection;
