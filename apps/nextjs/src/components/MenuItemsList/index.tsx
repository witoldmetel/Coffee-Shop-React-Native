import { type MenuItemType } from "~/types";
import MenuItem from "../MenuItem";

type MenuItemsListProps = {
  options: MenuItemType[];
};

export default function MenuItemsList({ options }: MenuItemsListProps) {
  return (
    <div className="animate-fade-in">
      {options.map((option) => (
        <MenuItem menuItem={option} key={option.id} />
      ))}
    </div>
  );
}
