import { CloseOutlined } from "@ant-design/icons";
import SideBarLink from "./SideBarLink";

const SideBar = ({
  onLogout,
  onOpenBarClick,
  isSidebarOpen,
}: {
  onLogout: () => void;
  onOpenBarClick: () => void;
  isSidebarOpen: boolean;
}) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 bg-gray-950 text-white flex flex-col h-full transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform lg:relative lg:translate-x-0`}
    >
      <div className="p-4 py-6 text-lg font-bold border-b text-red-600 uppercase border-gray-700">
        SkylrrNews
      </div>
      <nav className="flex flex-col flex-1 mt-4 space-y-2">
        {sideBarLinks.map(({ name, link }, index) => {
          return <SideBarLink key={index} name={name} link={link} />;
        })}
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-left hover:bg-red-600 transition text-red-400"
        >
          Logout
        </button>
      </nav>
      {/* Close button for mobile */}
      <button
        onClick={onOpenBarClick}
        className="absolute top-4 right-4 text-white lg:hidden"
      >
        <CloseOutlined />
      </button>
    </aside>
  );
};

export default SideBar;

const sideBarLinks: { name: string; link: string }[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Settings",
    link: "/settings",
  },
  {
    name: "Password Manager",
    link: "/password-manager",
  },
];
