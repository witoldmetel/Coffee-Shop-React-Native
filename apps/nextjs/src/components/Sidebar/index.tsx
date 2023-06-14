import { MENU_ITEMS } from "~/constants";
import MenuItemsList from "../MenuItemsList";

type SidebarProps = {
  isOpened: boolean;
};

export default function Sidebar({ isOpened }: SidebarProps) {
  return (
    <aside
      className="flex flex-col overflow-hidden bg-[#ddb892]"
      style={{
        width: isOpened ? "15vw" : "0vw",
        transition: "width 0.5s",
      }}
    >
      <MenuItemsList options={MENU_ITEMS} />
    </aside>
  );
}
