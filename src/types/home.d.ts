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
  windowStatus: boolean | undefined;
  sensors: SensorState<number | undefined>;

  updateDevice: (index: number, status: boolean) => void;
  reconnect: () => void;
  updateHost: (value: string) => Promise<void>;
}
