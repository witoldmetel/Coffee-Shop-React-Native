import { useState } from "react";
import Link from "next/link";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import { type MenuItemType } from "~/types";
import MenuItemsList from "../MenuItemsList";

type ExpandIconPros = {
  isExpanded: boolean;
  handleClick: () => void;
};

function ExpandIcon({ isExpanded, handleClick }: ExpandIconPros) {
  return isExpanded ? (
    <MdExpandLess onClick={handleClick} />
  ) : (
    <MdExpandMore onClick={handleClick} />
  );
}

type MenuItemProps = {
  menuItem: MenuItemType;
};

export default function MenuItem({
  menuItem: { name, icon: Icon, url, subItems },
}: MenuItemProps) {
  const [isExpanded, toggleExpanded] = useState(false);

  // const router = useRouter();
  // const selected = router.asPath === url;
  const isNested = subItems && subItems?.length > 0;

  const onClick = () => {
    toggleExpanded((prev) => !prev);
  };

  return (
    <>
      <a className="flex flex-row items-center justify-between p-2.5 text-xl">
        <Link href={url} passHref>
          <div className="flex flex-row items-center">
            <Icon />
            <span className="ml-3">{name}</span>
          </div>
        </Link>
        {isNested ? (
          <ExpandIcon isExpanded={isExpanded} handleClick={onClick} />
        ) : null}
      </a>
      {isExpanded && isNested ? <MenuItemsList options={subItems} /> : null}
    </>
  );
}
