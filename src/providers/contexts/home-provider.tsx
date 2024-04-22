import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEVICE_HOST, WEBSOCKET_PORT } from "../../config";
import homeContext, { defaultHomeContext } from "../../contexts/home-context";
import useWebSocket from "../../hooks/use-websocket";
import { HomeContext, SensorState } from "../../types/home";

type DeviceUpdate = {
  index: number;
  status: number;
};

type WS_MESSAGE =
  | {
      type: "INITIAL_STATE";
      data: {
        sensors: SensorState;
        devices: number[];
        window: number;
      };
    }
  | {
      type: "SENSOR_STATE";
      data: SensorState;
    }
  | {
      type: "DEVICE_UPDATE";
      data: DeviceUpdate;
    }
  | {
      type: "WINDOW_UPDATE";
      data: number;
    };

type Props = {
  children: ReactNode;
};

const HomeProvider = (props: Props) => {
  const { children } = props;

  // App States ----------------------------------------------------------------------
  const [devices, setDevices] = useState(defaultHomeContext.devices);
  const [windowStatus, setWindowStatus] = useState(
    defaultHomeContext.windowStatus
  );
  const [sensors, setSensors] = useState(defaultHomeContext.sensors);
  const [deviceHost, setDeviceHost] = useState<undefined | string>(undefined);

  // Handlers ----------------------------------------------------------------------

  const updateDevicesIndex = (deviceIndex: number, deviceStatus: number) => {
    setDevices((prev) => {
      const prevValues = [...prev];

      if (prevValues[deviceIndex] === undefined) return prev;
      if (deviceStatus === 1) {
        prevValues[deviceIndex] = true;
      } else if (deviceStatus === 0) {
        prevValues[deviceIndex] = false;
      }

      return prevValues;
    });
  };

  const updateSensors = (sensorState: SensorState<number | undefined>) => {
    if (typeof sensorState !== "object") return;

    setSensors((prev) => {
      const prevValues = { ...prev };

      if (
        typeof sensorState?.flame === "number" &&
        !isNaN(sensorState?.flame)
      ) {
        prevValues.flame = sensorState.flame;
      }

      if (typeof sensorState?.gas === "number" && !isNaN(sensorState?.gas)) {
        prevValues.gas = sensorState.gas;
      }

      if (
        typeof sensorState?.humidity === "number" &&
        !isNaN(sensorState?.humidity)
      ) {
        prevValues.humidity = sensorState.humidity;
      }

      if (typeof sensorState?.rain === "number" && !isNaN(sensorState?.rain)) {
        prevValues.rain = sensorState.rain;
      }

      if (
        typeof sensorState?.temperature === "number" &&
        !isNaN(sensorState?.temperature)
      ) {
        prevValues.temperature = sensorState.temperature;
      }

      return prevValues;
    });
  };

  const handleNewMessage = (msg: string) => {
    try {
      const response: WS_MESSAGE = JSON.parse(msg);

      if (
        !response?.type ||
        response?.data == undefined ||
        response?.data == null
      )
        throw new Error("Invalid Message");

      switch (response.type) {
        case "INITIAL_STATE": {
          if (!Array.isArray(response.data?.devices)) {
            console.error("Invalid inital state device value");
          } else {
            setDevices((prev) => {
              const prevValues = [...prev];

              response.data?.devices.forEach((item: number, index: number) => {
                if (prevValues[index] === undefined) return;
                if (item === 1) {
                  prevValues[index] = true;
                } else if (item === 0) {
                  prevValues[index] = false;
                }
              });

              return prevValues;
            });
          }

          updateSensors(response.data?.sensors);
          setWindowStatus(response.data?.window === 1 ? true : false);

          break;
        }
        case "DEVICE_UPDATE": {
          const deviceIndex = response?.data?.index;
          const deviceStatus = response?.data?.status;
          if (
            typeof deviceIndex !== "number" ||
            Number.isNaN(deviceIndex) ||
            typeof deviceStatus !== "number" ||
            Number.isNaN(deviceStatus)
          )
            throw new Error("Invalid update state value");

          updateDevicesIndex(deviceIndex, deviceStatus);

          break;
        }
        case "SENSOR_STATE": {
          updateSensors(response.data);
          break;
        }
        case "WINDOW_UPDATE": {
          setWindowStatus(response.data === 1 ? true : false);
          break;
        }
        default: {
          console.log("Unknown Message: ", response);
          break;
        }
      }
    } catch (error) {
      console.error("ERROR: handle WS message", { error, msg });
    }
  };

  // Dependent States ----------------------------------------------------------------------
  const { isLoading, isReady, send, reconnect } = useWebSocket(
    `ws://${deviceHost}:${WEBSOCKET_PORT}`,
    handleNewMessage
  );

  // Actions ----------------------------------------------------------------------

  const updateDevice: HomeContext["updateDevice"] = useCallback(
    (index: number, on: boolean) => {
      send(
        JSON.stringify({
          index: index,
          status: on ? 1 : 0,
        })
      );

      updateDevicesIndex(index, Number(on));
    },
    [send]
  );

  const updateHost: HomeContext["updateHost"] = async (value: string) => {
    try {
      await AsyncStorage.setItem("DEVICE_HOST", value);
      setDeviceHost(value);
    } catch (e) {
      console.error("ERROR: Saving Device Host: ", e);
    }
  };

  const persistDeviceHost = async () => {
    try {
      const value = await AsyncStorage.getItem("DEVICE_HOST");
      if (value !== null) {
        setDeviceHost(value);
      } else {
        setDeviceHost(DEVICE_HOST);
      }
    } catch (e) {
      console.error("ERROR: Read Device HOST");
    }
  };

  // Effects ----------------------------------------------------------------------
  useEffect(() => {
    persistDeviceHost();
  }, []);

  // Memorized values ----------------------------------------------------------------------

  const value = useMemo(
    () => ({
      isLoading,
      isReady,
      updateDevice,
      updateHost,
      windowStatus,
      devices,
      sensors,
      reconnect,
    }),
    [devices, isLoading, isReady, sensors, updateDevice, windowStatus]
  );

  return <homeContext.Provider value={value}>{children}</homeContext.Provider>;
};

export default HomeProvider;
