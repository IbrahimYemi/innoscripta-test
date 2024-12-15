import { NavLink } from "react-router-dom";

const SideBarLink = ({ name, link }: { name: string; link: string }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `w-full px-4 py-2 text-left transition capitalize ${
          isActive ? "bg-gray-100 text-gray-950" : "hover:bg-gray-700"
        }`
      }
    >
      {name}
    </NavLink>
  );
};

export default SideBarLink;
