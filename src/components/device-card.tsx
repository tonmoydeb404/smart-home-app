import { LucidePower } from "lucide-react-native";
import React, { ReactElement } from "react";
import { Text, View } from "react-native";
import { Card, CardBody, CardBodyProps, CardProps } from "./common/card";

type Props = {
  index: number;
  currentStatus: boolean;
  cardProps?: Omit<CardProps, "children">;
  cardBodyProps?: Omit<CardBodyProps, "children">;

  title?: string;
  icon?: ReactElement;
};

const DeviceCard = (props: Props) => {
  const { index, currentStatus, cardBodyProps, cardProps, icon, title } = props;

  return (
    <Card
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[50%] w-full"
      {...cardProps}
    >
      <CardBody {...cardBodyProps} className="px-3 py-3">
        <View
          className={`w-16 h-16 flex items-center justify-center rounded-xl mb-2 ${
            currentStatus ? "bg-blue-600" : "bg-gray-800"
          }`}
        >
          {icon || <LucidePower size={32} className="text-gray-200" />}
        </View>
        <Text className="text-lg text-slate-100 font-medium">
          {title || `Device ${index + 1}`}
        </Text>
      </CardBody>
    </Card>
  );
};

export default DeviceCard;
