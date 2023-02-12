import { ReactNode } from "react";
import { AiFillFileAdd, AiOutlineHome } from "react-icons/ai";
interface navLinkObjType {
  name: string;
  path: string;
  icon: ReactNode | any;
}

export const navLinks: Array<navLinkObjType> = [
  {
    name: "Home",
    path: "/",
    icon: AiOutlineHome,
  },
  {
    name: "Create Post",
    path: "/createPost",
    icon: AiFillFileAdd,
  },
];
