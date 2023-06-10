import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TbChristmasTree } from "react-icons/tb";

import { type MenuItemType } from "~/types";
import MenuItemsList from "../MenuItemsList";

type ExpandIconPros = {
  isExpanded: boolean;
  handleClick: () => void;
};

function ExpandIcon({ isExpanded, handleClick }: ExpandIconPros) {
  return isExpanded ? (
    <TbChristmasTree onClick={handleClick} />
  ) : (
    <TbChristmasTree onClick={handleClick} />
  );
}

type MenuItemProps = {
  menuItem: MenuItemType;
};

export default function MenuItem({
  menuItem: { name, icon: Icon, url, depth, subItems },
}: MenuItemProps) {
  const [isExpanded, toggleExpanded] = useState(false);

  const router = useRouter();
  const selected = router.asPath === url;
  const isNested = subItems && subItems?.length > 0;

  const onClick = () => {
    toggleExpanded((prev) => !prev);
  };

  return (
    <>
      {/* <a className={selected ? "selected" : ""} depth={depth}> */}
      <div className={selected ? "selected" : ""}>
        <Link href={url} passHref>
          <div className="menu-item">
            <Icon />
            <span>{name}</span>
          </div>
        </Link>
        {isNested ? (
          <ExpandIcon isExpanded={isExpanded} handleClick={onClick} />
        ) : null}
      </div>
      {isExpanded && isNested ? <MenuItemsList options={subItems} /> : null}
    </>
  );
}

// export const MenuItemContainer = styled.a<{ depth: number }>`
//   display: flex;
//   flex-direction: row;
//   font-size: 20px;
//   padding: 10px 0px 10px 10px;
//   align-items: center;
//   justify-content: space-between;

//   & svg {
//     height: 30px;
//     margin-right: 10px;
//   }

//   &:hover {
//     background-color: ${(props) => props.theme.colors.main};
//     color: ${(props) => props.theme.colors.secondary};
//     opacity: 0.5;
//     cursor: pointer;
//   }

//   .menu-item {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     margin-left: ${({ depth }) => `${depth}rem`};
//   }

//   &.selected {
//     background-color: ${(props) => props.theme.colors.main};
//     color: ${(props) => props.theme.colors.textLight};
//   }
// `;
