import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="align-center flex h-12 justify-center bg-[#43281c]">
      <a
        className="p-2.5 hover:cursor-pointer"
        href="https://github.com/witoldmetel"
        target="_blank"
      >
        <AiFillGithub size={25} color="#F8EFBD" />
      </a>
    </footer>
  );
}
