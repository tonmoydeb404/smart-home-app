import { LucidePower } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { Card, CardBody, CardProps } from "./common/card";

type Props = {
  index: number;
  currentStatus: boolean;
} & Omit<CardProps, "children">;

const DeviceCard = (props: Props) => {
  const { index, currentStatus, ...other } = props;

  return (
    <Card
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[50%] w-full"
      {...other}
    >
      <CardBody>
        <View
          className={`w-16 h-16 flex items-center justify-center rounded-xl mb-2 ${
            currentStatus ? "bg-amber-600" : "bg-gray-900"
          }`}
        >
          <LucidePower size={32} className="text-gray-200" />
        </View>
        <Text className="text-lg font-medium">Device {index + 1}</Text>
      </CardBody>
    </Card>
  );
};

export default DeviceCard;
