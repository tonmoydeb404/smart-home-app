import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import HomePage from "./src/pages/home";
import Providers from "./src/providers";

export default function App() {
  return (
    <ScrollView className="flex-1 mt-7 pt-5 bg-slate-950 text-slate-50">
      <StatusBar style="auto" />
      <SafeAreaView className="flex-1 pb-10">
        <Providers>
          <HomePage />
        </Providers>
      </SafeAreaView>
    </ScrollView>
  );
}
