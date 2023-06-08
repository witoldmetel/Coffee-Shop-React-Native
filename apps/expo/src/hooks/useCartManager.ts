import { useContext } from "react";

import { CartManagerContext } from "~/contexts/CartManagerContext";
import { type CartManagerContextType } from "../../../types";

export const useCartManager = () => {
  const context = useContext<CartManagerContextType | null>(CartManagerContext);

  if (!context) {
    throw new Error(
      "Cart Manager context must be use inside CartManagerProvider",
    );
  }

  return context;
};
