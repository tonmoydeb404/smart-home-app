import { LucideRefreshCw } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useHome from "../../../hooks/contexts/use-home";
import OptionsBtn from "./options-btn";

const HeaderSection = () => {
  const { isReady, isLoading, reconnect } = useHome();

  return (
    <View className="flex-row items-center w-full mb-10">
      <Text className="text-slate-50 text-2xl font-bold mr-auto">
        Smart Home
      </Text>

      <TouchableOpacity
        disabled={isLoading}
        onPress={reconnect}
        className={
          isReady
            ? "bg-green-600/30 p-2 rounded-lg mr-1"
            : "bg-red-600/30 p-2 rounded-lg mr-1"
        }
      >
        <LucideRefreshCw
          size={24}
          className={isReady ? "text-green-600" : "text-red-600"}
        />
      </TouchableOpacity>
      <OptionsBtn />
    </View>
  );
};

export default HeaderSection;
