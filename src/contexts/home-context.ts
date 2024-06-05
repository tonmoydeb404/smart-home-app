import { createContext } from "react";
import { HomeContext } from "../types/home";

export const defaultHomeContext: HomeContext = {
  isLoading: true,
  isReady: false,
  windowStatus: undefined,
  reconnect: () => {},
  devices: [false, false, false, false, false, false, false, false],
  devicesDetails: [],
  sensors: {
    flame: undefined,
    gas: undefined,
    humidity: undefined,
    rain: undefined,
    temperature: undefined,
  },

  updateDevice: (() => {}) as HomeContext["updateDevice"],
  updateDeviceDetails: (() => {}) as HomeContext["updateDeviceDetails"],
  updateHost: async (_value) => {},
};

const homeContext = createContext(defaultHomeContext);

export default homeContext;
