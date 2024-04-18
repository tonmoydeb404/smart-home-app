import {
  LucideCloudSun,
  LucideDroplets,
  LucideFlame,
  LucideHelpCircle,
  LucideThermometerSnowflake,
  LucideWind,
} from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { Card, CardBody, CardBodyProps, CardProps } from "./common/card";

// ----------------------------------------------------------------------

const icons = {
  temperature: LucideThermometerSnowflake,
  humidity: LucideDroplets,
  gas: LucideWind,
  fire: LucideFlame,
  weather: LucideCloudSun,
};

type Props = {
  label: string;
  value: string;
  icon: keyof typeof icons;
  cardProps?: Omit<CardProps, "children">;
  cardBodyProps?: Omit<CardBodyProps, "children">;
};

// ----------------------------------------------------------------------

const StatCard = (props: Props) => {
  const { icon, label, value, cardBodyProps, cardProps } = props;

  const Icon = icons[icon] || LucideHelpCircle;

  return (
    <Card {...cardProps}>
      <CardBody className="flex-row items-center gap-2" {...cardBodyProps}>
        <Icon size={32} className="text-blue-600" />
        <View className="flex flex-col">
          <Text className="text-slate-400 text-xs uppercase">{label}</Text>
          <Text className="text-slate-100 text-xl font-medium">{value}</Text>
        </View>
      </CardBody>
    </Card>
  );
};

export default StatCard;
