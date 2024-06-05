import React, { ReactNode } from "react";
import {
  Pressable,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";

// ----------------------------------------------------------------------

export type CardProps = { pressable?: boolean } & TouchableOpacityProps &
  ViewProps;

export const Card = (props: CardProps) => {
  const { children, className = "", pressable, ...other } = props;

  if (pressable === true) {
    return (
      <Pressable
        className={`bg-white/10 border-white/20 active:bg-white/20 rounded-xl border active:border-slate-700 ${className}`}
        {...other}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      className={`bg-white/10 border-white/20 rounded-xl border ${className}`}
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
  const { children, className = "", ...other } = props;
  return (
    <View className={`px-1.5 py-2 ${className}`} {...other}>
      {children}
    </View>
  );
};
