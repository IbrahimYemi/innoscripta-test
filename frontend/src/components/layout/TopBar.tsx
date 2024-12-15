import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { User } from "../../interfaces/Auth";

const TopBar = ({ user, onLogout, onOpenBarClick }: { user: User | null; onLogout: () => void; onOpenBarClick: () => void; }) => {
  return (
    <header className="bg-gray-100 border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {/* Hamburger menu for mobile */}
        <button
          onClick={onOpenBarClick}
          className="text-gray-800 lg:hidden"
        >
          <MenuOutlined className="text-2xl" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:block text-gray-800">{user?.name}</div>
        <div className="w-10 h-10 rounded-full border border-gray-300 text-center flex items-center justify-center">
          <UserOutlined className="text-lg" />
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition hidden md:block"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopBar;
