import React from "react";
import { Text, View } from "react-native";
import { Card, CardBody } from "../../components/common/card";
import StatCard from "../../components/stat-card";
import useHome from "../../hooks/contexts/use-home";
import { HomeContext } from "../../types/home";

const StatsSection = () => {
  const { sensors } = useHome();

  return (
    <>
      <Text className="uppercase text-slate-300 font-medium text-sm mb-2">
        Sensor Stats
      </Text>
      <Card className="border-0 bg-transparent mb-8">
        <CardBody className="flex-col">
          <View className="w-full flex-row my-1">
            <StatCard
              icon="temperature"
              label="Temperature"
              value={getValue("temperature", sensors.temperature)}
              cardProps={{ className: "w-full flex-1 mr-1" }}
            />
            <StatCard
              icon="humidity"
              label="Humidity"
              value={getValue("humidity", sensors.humidity)}
              cardProps={{ className: "w-full flex-1 ml-1" }}
            />
          </View>
          <View className="w-full flex-row my-1">
            <StatCard
              icon="gas"
              label="Gas"
              value={getValue("gas", sensors.gas)}
              cardProps={{ className: "w-full flex-1 mr-1" }}
            />
            <StatCard
              icon="fire"
              label="Fire"
              value={getValue("flame", sensors.flame)}
              cardProps={{ className: "w-full flex-1 ml-1" }}
            />
          </View>
          <View className="w-full flex-row my-1">
            <StatCard
              icon="weather"
              label="Weather"
              value={getValue("rain", sensors.rain)}
              cardProps={{ className: "w-full flex-1" }}
            />
          </View>
        </CardBody>
      </Card>
    </>
  );
};

export default StatsSection;

const getValue = (
  key: keyof HomeContext["sensors"],
  value: number | undefined
) => {
  if (value === undefined) {
    return "Not set";
  }

  if (key === "temperature") {
    return `${value.toFixed(1)}deg`;
  }

  if (key === "humidity") {
    return `${value.toFixed(0)}%`;
  }

  if (key === "gas") {
    return `${value >= 600 ? "Yes" : "No"} (${value})`;
  }

  if (key === "flame") {
    return `${value === 1 ? "No" : "Yes"}`;
  }

  if (key === "rain" && value !== 0) {
    return `${value <= 3000 ? "Raining" : "Normal"}`;
  }

  return "Not set";
};
