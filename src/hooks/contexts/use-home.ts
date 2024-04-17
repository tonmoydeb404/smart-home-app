import { useContext } from "react";
import homeContext from "../../contexts/home-context";

const useHome = () => {
  const value = useContext(homeContext);

  if (!value) {
    throw new Error(
      "homeContext: Access Restricted for out of context childrens."
    );
  }

  return value;
};

export default useHome;
