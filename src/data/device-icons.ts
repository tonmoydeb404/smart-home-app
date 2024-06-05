import {
  LucideAirVent,
  LucideDroplets,
  LucideFan,
  LucideLaptop,
  LucideLightbulb,
  LucideMicrowave,
  LucideMonitor,
  LucidePower,
  LucideRefrigerator,
  LucideSpeaker,
  LucideTv,
  LucideWashingMachine,
} from "lucide-react-native";

const deviceIcons = [
  { key: "fan", icon: LucideFan, title: "Fan" },
  { key: "light", icon: LucideLightbulb, title: "Light" },
  { key: "refrigerator", icon: LucideRefrigerator, title: "Refrigerator" },
  { key: "ac", icon: LucideAirVent, title: "AC" },
  {
    key: "washing_machine",
    icon: LucideWashingMachine,
    title: "Washing Machine",
  },
  { key: "microwave", icon: LucideMicrowave, title: "Microwave" },
  { key: "speaker", icon: LucideSpeaker, title: "Speaker" },
  { key: "television", icon: LucideTv, title: "Television" },
  { key: "laptop", icon: LucideLaptop, title: "Laptop" },
  { key: "desktop", icon: LucideMonitor, title: "Desktop" },
  { key: "water", icon: LucideDroplets, title: "Water" },
  { key: "power", icon: LucidePower, title: "Power" },
];
export default deviceIcons;

export const getDeviceIcon = (key: string | undefined) =>
  deviceIcons.find((d) => d.key === key);
