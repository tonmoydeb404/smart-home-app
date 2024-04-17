import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView } from "react-native";
import HomePage from "./src/pages/home";

export default function App() {
  return (
    <ScrollView className="my-10">
      <HomePage />
      <StatusBar style="auto" />
    </ScrollView>
  );
}
