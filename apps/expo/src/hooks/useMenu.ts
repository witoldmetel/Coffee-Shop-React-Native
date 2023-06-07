import { useQuery } from "@tanstack/react-query";

import { type MenuItemType } from "../../../types";

function getMenu() {
  return fetch("https://firtman.github.io/coffeemasters/api/menu.json").then(
    (response) => response.json(),
  );
}

export const useMenu = (): [
  MenuItemType[] | undefined,
  "error" | "success" | "loading",
  unknown,
] => {
  const {
    data: menuItems,
    status,
    error,
  } = useQuery<MenuItemType[]>({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  return [menuItems, status, error];
};
