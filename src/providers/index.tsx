import React, { ReactNode } from "react";
import HomeProvider from "./contexts/home-provider";

type Props = {
  children: ReactNode;
};

const Providers = (props: Props) => {
  const { children } = props;
  return (
    <>
      <HomeProvider>{children}</HomeProvider>
    </>
  );
};

export default Providers;
