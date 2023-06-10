export type MenuItemType = {
  name: string;
  icon: React.ComponentType;
  url: string;
  id: string;
  depth: number;
  subItems?: MenuItemType[];
};

export type MenuOptionType = {
  name: string;
  icon: React.ComponentType;
  url: string;
  subItems?: MenuOptionType[];
};
