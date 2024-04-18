import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";

// ----------------------------------------------------------------------

export type CardProps = { pressable?: boolean } & TouchableOpacityProps &
  ViewProps;

export const Card = (props: CardProps) => {
  const { children, className, pressable, ...other } = props;

  if (pressable === true) {
    return (
      <TouchableOpacity
        className={`bg-slate-900 rounded-xl text-slate-100 border border-slate-800 ${className}`}
        {...other}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      className={`bg-slate-900 rounded-xl text-slate-100 border border-slate-800 ${className}`}
      {...other}
    >
      {children}
    </View>
  );
};

// ----------------------------------------------------------------------

export type CardBodyProps = {
  children: ReactNode;
} & ViewProps;

export const CardBody = (props: CardBodyProps) => {
  const { children, className, ...other } = props;
  return (
    <View className={`px-1.5 py-2 ${className}`} {...other}>
      {children}
    </View>
  );
};
