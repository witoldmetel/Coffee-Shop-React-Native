import { FaCoffee, FaShoppingCart, FaTag } from "react-icons/fa";

import { type MenuItemType, type MenuOptionType } from "~/types";

const MENU_OPTIONS: MenuOptionType[] = [
  {
    name: "Menu",
    icon: FaCoffee,
    url: "/",
  },
  {
    name: "Offers",
    icon: FaTag,
    url: "/offers",
  },
  {
    name: "My Order",
    icon: FaShoppingCart,
    url: "/order",
  },
];

function makeMenuLevel(options: MenuOptionType[], depth = 0): MenuItemType[] {
  return options.map((option, idx) => ({
    ...option,
    id: depth === 0 ? idx.toString() : `${depth}.${idx}`,
    depth,
    subItems:
      option.subItems && option.subItems.length > 0
        ? makeMenuLevel(option.subItems, depth + 1)
        : undefined,
  }));
}

export const MENU_ITEMS: MenuItemType[] = makeMenuLevel(MENU_OPTIONS);
