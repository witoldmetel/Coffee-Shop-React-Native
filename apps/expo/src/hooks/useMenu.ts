import { useQuery } from "@tanstack/react-query";

import { type ProductType } from "../../../../packages/types";

function getMenu() {
  return fetch("https://firtman.github.io/coffeemasters/api/menu.json").then(
    (response) => response.json(),
  );
}

export const useMenu = (): [
  ProductType[] | undefined,
  "error" | "success" | "loading",
  unknown,
] => {
  const {
    data: menuItems,
    status,
    error,
  } = useQuery<ProductType[]>({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  return [menuItems, status, error];
};
