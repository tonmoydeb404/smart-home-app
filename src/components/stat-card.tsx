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
import { Card, CardBody } from "./common/card";

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
};

// ----------------------------------------------------------------------

const StatCard = (props: Props) => {
  const { icon, label, value } = props;

  const Icon = icons[icon] || LucideHelpCircle;

  return (
    <Card className="border-none bg-transparent">
      <CardBody className="flex-row items-center gap-2">
        <Icon size={32} className="text-amber-600" />
        <View className="flex flex-col">
          <Text className="text-xs uppercase">{label}</Text>
          <Text className="text-xl font-medium">{value}</Text>
        </View>
      </CardBody>
    </Card>
  );
};

export default StatCard;
