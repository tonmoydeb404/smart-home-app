import { createContext } from "react";
import { HomeContext } from "../types/home";

export const defaultHomeContext: HomeContext = {
  isLoading: true,
  isReady: false,
  devices: [false, false, false, false, false, false, false, false],
  sensors: {
    flame: undefined,
    gas: undefined,
    humidity: undefined,
    rain: undefined,
    temperature: undefined,
  },

  updateDevice: (() => {}) as HomeContext["updateDevice"],
};

const homeContext = createContext(defaultHomeContext);

export default homeContext;
