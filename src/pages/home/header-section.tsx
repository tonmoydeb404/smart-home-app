import { LucideRefreshCw } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useHome from "../../hooks/contexts/use-home";

const HeaderSection = () => {
  const { isReady, isLoading, reconnect } = useHome();

  return (
    <View className="flex-row items-center justify-between w-full mb-10">
      <Text className="text-slate-50 text-2xl font-bold">Smart Home</Text>

      <TouchableOpacity
        disabled={isLoading}
        onPress={reconnect}
        className={
          isReady
            ? "bg-green-600/30 p-2 rounded-lg"
            : "bg-red-600/30 p-2 rounded-lg"
        }
      >
        <LucideRefreshCw
          size={24}
          className={isReady ? "text-green-600" : "text-red-600"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderSection;
