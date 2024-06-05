import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

// ----------------------------------------------------------------------

const styles = {
  default: "bg-blue-600 active:bg-blue-700",
  error: "bg-red-600 active:bg-red-700",
  base: "bg-slate-700 active:bg-slate-600",
  success: "bg-green-600 active:bg-green-700",
};

type Props = {
  label: string;
  className?: string;
  variant?: keyof typeof styles;
} & PressableProps;

// ----------------------------------------------------------------------

const Button = (props: Props) => {
  const { label, variant = "default", className = "", ...rest } = props;

  return (
    <Pressable
      className={`w-full px-4 py-2 inline-flex items-center justify-center rounded ${styles[variant]} ${className}`}
      {...rest}
    >
      <Text className="font-medium text-white">{label}</Text>
    </Pressable>
  );
};

export default Button;
