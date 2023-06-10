import { TbChristmasTree } from "react-icons/tb";

import { type MenuItemType, type MenuOptionType } from "~/types";

const MENU_OPTIONS: MenuOptionType[] = [
  {
    name: "Dashboard",
    icon: TbChristmasTree,
    url: "/",
  },
  {
    name: "Orders",
    icon: TbChristmasTree,
    url: "/orders",
    subItems: [
      {
        name: "New",
        icon: TbChristmasTree,
        url: "/new-orders",
      },
      {
        name: "Completed",
        icon: TbChristmasTree,
        url: "/completed-orders",
      },
    ],
  },
  {
    name: "Customers",
    icon: TbChristmasTree,
    url: "/customers",
    subItems: [
      {
        name: "Corporate",
        icon: TbChristmasTree,
        url: "/corporate",
      },
      {
        name: "SMB",
        icon: TbChristmasTree,
        url: "/smb",
        subItems: [
          {
            name: "Retail",
            icon: TbChristmasTree,
            url: "/retail",
          },
        ],
      },
    ],
  },
  {
    name: "Inventory",
    icon: TbChristmasTree,
    url: "/inventory",
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
