import React, { ReactNode } from "react";
import { View, ViewProps } from "react-native";

// ----------------------------------------------------------------------

export type CardProps = {
  children: ReactNode;
} & ViewProps;

export const Card = (props: CardProps) => {
  const { children, ...other } = props;
  return <View {...other}>{children}</View>;
};

// ----------------------------------------------------------------------

export type CardBodyProps = {
  children: ReactNode;
} & ViewProps;

export const CardBody = (props: CardBodyProps) => {
  const { children, ...other } = props;
  return <View {...other}>{children}</View>;
};
