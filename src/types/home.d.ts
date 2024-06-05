export type DeviceDetails = {
  index: number;
  title: string;
  icon: string;
};

export type SensorState<T = number> = {
  temperature: T;
  humidity: T;
  rain: T;
  gas: T;
  flame: T;
};

export interface HomeContext {
  isLoading: boolean;
  isReady: boolean;
  devices: boolean[];
  devicesDetails: (DeviceDetails | undefined)[];
  windowStatus: boolean | undefined;
  sensors: SensorState<number | undefined>;

  updateDeviceDetails: (index: number, value: DeviceDetails) => void;
  updateDevice: (index: number, status: boolean) => void;
  reconnect: () => void;
  updateHost: (value: string) => Promise<void>;
}
