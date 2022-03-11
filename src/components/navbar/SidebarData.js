import { MdHelp, MdHome, MdSettings, MdOutlineAddLink } from "react-icons/md";

export const SidebarData = [
  {
    title: "Home",
    icon: <MdHome />,
    link: "/"
  },
  {
    title: "Config",
    icon: <MdSettings />,
    link: "/Config"
  },
  {
    title: "Logica",
    icon: <MdOutlineAddLink />,
    link: "/Logic"
  },
  {
    title: "Ajuda",
    icon: <MdHelp />,
    link: "/help"
  }
];