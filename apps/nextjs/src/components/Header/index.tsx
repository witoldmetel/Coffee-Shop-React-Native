import Image from "next/image";
import { TbChristmasTree } from "react-icons/tb";

type HeaderProps = {
  isOpened: boolean;
  toggleDrawer: () => void;
};

export default function Header({ isOpened, toggleDrawer }: HeaderProps) {
  return (
    <header className="align-center flex h-12 justify-center bg-[#43281c]">
      <div className="p-2.5 hover:cursor-pointer" onClick={toggleDrawer}>
        {isOpened ? <TbChristmasTree /> : <TbChristmasTree />}
      </div>
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <Image
          src="../../../public/logo.svg"
          width={200}
          height={200}
          alt="coffee shop logo"
        />
      </div>
    </header>
  );
}
