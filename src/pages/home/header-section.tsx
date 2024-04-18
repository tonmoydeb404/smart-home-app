import {
  LucideRadio,
  LucideRefreshCw,
  LucideUnplug,
} from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useHome from "../../hooks/contexts/use-home";

const HeaderSection = () => {
  const { isReady, isLoading, reconnect } = useHome();

  return (
    <View className="flex-row items-center justify-between w-full mb-10">
      <Text className="text-slate-50 text-2xl font-bold">Smart Home</Text>

      {isReady ? (
        <View className="bg-green-600/30 p-2 rounded-lg">
          <LucideRadio size={24} className="text-green-600" />
        </View>
      ) : (
        <View className="flex-row items-end gap-2">
          <View className="bg-red-600/30 p-2 rounded-lg">
            <LucideUnplug size={24} className="text-red-600" />
          </View>
          <TouchableOpacity
            disabled={isLoading}
            onPress={reconnect}
            className="bg-blue-600/30 p-2 rounded-lg"
          >
            <LucideRefreshCw size={24} className={`text-blue-600`} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HeaderSection;
