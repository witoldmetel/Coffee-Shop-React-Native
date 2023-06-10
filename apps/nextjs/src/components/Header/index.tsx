import Image from "next/image";
import { AiOutlineCaretLeft, AiOutlineMenuUnfold } from "react-icons/ai";

type HeaderProps = {
  isOpened: boolean;
  toggleDrawer: () => void;
};

export default function Header({ isOpened, toggleDrawer }: HeaderProps) {
  return (
    <header className="align-center flex h-12 justify-between bg-[#43281c]">
      <div className="p-2.5 hover:cursor-pointer" onClick={toggleDrawer}>
        {isOpened ? (
          <AiOutlineCaretLeft size={25} color="#F8EFBD" />
        ) : (
          <AiOutlineMenuUnfold size={25} color="#F8EFBD" />
        )}
      </div>
      <Image src="/logo.svg" width={150} height={150} alt="coffee shop logo" />
      <div />
    </header>
  );
}
