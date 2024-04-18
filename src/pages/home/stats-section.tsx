import React from "react";
import { Text } from "react-native";
import { Card, CardBody } from "../../components/common/card";
import StatCard from "../../components/stat-card";
import useHome from "../../hooks/contexts/use-home";

const StatsSection = () => {
  const { sensors } = useHome();

  return (
    <>
      <Text className="uppercase text-slate-300 font-medium text-sm mb-2">
        Sensor Stats
      </Text>
      <Card className="border-none bg-background/60 dark:bg-default-100/50 mb-8">
        <CardBody className="flex-row flex-wrap">
          <StatCard
            icon="temperature"
            label="Temperature"
            value={
              sensors?.temperature !== undefined
                ? `${sensors.temperature.toFixed(1)}deg`
                : "not set"
            }
            cardProps={{ className: "w-1/2" }}
          />
          <StatCard
            icon="humidity"
            label="Humidity"
            value={
              sensors?.humidity !== undefined
                ? `${sensors.humidity.toFixed(0)}%`
                : "not set"
            }
            cardProps={{ className: "w-1/2" }}
          />
          <StatCard
            icon="gas"
            label="Gas"
            value={
              sensors?.gas !== undefined
                ? `${sensors.gas >= 600 ? "Yes" : "No"} (${sensors.gas})`
                : "not set"
            }
            cardProps={{ className: "w-1/2" }}
          />
          <StatCard
            icon="fire"
            label="Fire"
            value={
              sensors?.flame !== undefined
                ? `${sensors.flame === 1 ? "No" : "Yes"} `
                : "not set"
            }
            cardProps={{ className: "w-1/2" }}
          />
          <StatCard
            icon="weather"
            label="Weather"
            value={
              sensors?.rain !== undefined && sensors?.rain !== 0
                ? `${sensors.rain <= 3000 ? "Raining" : "Normal"} `
                : "not set"
            }
            cardProps={{ className: "w-1/2" }}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default StatsSection;
