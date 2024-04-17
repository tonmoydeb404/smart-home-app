import { LucideRadio, LucideUnplug } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import useHome from "../../hooks/contexts/use-home";

const HeaderSection = () => {
  const { isReady } = useHome();

  return (
    <View className="flex-row items-center justify-between w-full mb-10">
      <Text className="text-foreground text-2xl font-bold">Smart Home</Text>

      <View>
        {isReady ? (
          <LucideRadio size={24} className="text-green-600" />
        ) : (
          <LucideUnplug size={24} className="text-red-600" />
        )}
      </View>
    </View>
  );
};

export default HeaderSection;
