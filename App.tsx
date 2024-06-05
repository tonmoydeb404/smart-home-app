import { StatusBar } from "expo-status-bar";
import React from "react";
import { ImageBackground, SafeAreaView, ScrollView } from "react-native";
import HomePage from "./src/pages/home";
import Providers from "./src/providers";

export default function App() {
  return (
    <ScrollView className="flex-1 bg-slate-950 text-slate-50">
      <StatusBar style="auto" />
      <ImageBackground
        source={require("./assets/app_bg.jpg")}
        resizeMode="cover"
      >
        <SafeAreaView className="flex-1 mt-10 pb-10">
          <Providers>
            <HomePage />
          </Providers>
        </SafeAreaView>
      </ImageBackground>
    </ScrollView>
  );
}
