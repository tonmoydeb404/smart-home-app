import React from "react";
import { View } from "react-native";
import DevicesSection from "./devices-section";
import HeaderSection from "./header-section";
import StatsSection from "./stats-section";

const HomePage = () => {
  return (
    <View className="px-4 flex-1">
      <HeaderSection />
      <StatsSection />
      <DevicesSection />
    </View>
  );
};

export default HomePage;
