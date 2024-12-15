import {
  LoginOutlined,
  UserOutlined,
  UserSwitchOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import useTopCategories from "../../hooks/useTopCategories";

const NavBar = () => {
  const { categories, loading } = useTopCategories();
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : {};
  const userName = parsedUser?.name;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white w-full z-50 mt-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-5">
          <Link to="/">
            <h1 className="text-xl font-bold text-red-600">SkyllrNews</h1>
          </Link>
          <div className="h-full text-gray-500 rounded-t rounded-b hidden md:block">
            |
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : (
              categories?.map((category) => (
                <h3
                  key={category}
                  className="capitalize font-semibold hover:text-red-600 transition-colors"
                >
                  {category}
                </h3>
              ))
            )}
          </div>
        </div>

        {/* Auth Controls */}
        <div className="hidden md:flex items-center gap-5">
          {userName ? (
            <>
              <Link to="/dashboard">
                <div className="flex gap-2 items-center bg-gray-100 rounded px-3 py-1 cursor-pointer hover:shadow-md hover:shadow-red-600">
                  <h2 className="font-semibold">{userName || 'Guest'}</h2>
                  <UserOutlined className="text-lg" />
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link role="Login" to="/login">
                <LoginOutlined
                  title="login"
                  className="text-lg hover:text-red-600 cursor-pointer"
                />
              </Link>
              <div className="flex gap-2 items-center bg-gray-100 rounded px-3 py-1 cursor-pointer hover:shadow-md hover:shadow-red-600">
                <h2 className="font-semibold">Guest</h2>
                <UserSwitchOutlined className="text-lg" />
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-600 hover:text-red-600"
          >
            {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-3">
          <div className="flex flex-col gap-4">
            {["sport", "politics", "technology", "stories"].map((category) => (
              <a
                key={category}
                href={category}
                className="capitalize font-semibold hover:text-red-600 transition-colors"
              >
                {category}
              </a>
            ))}
          </div>
          <hr className="my-3" />
          <div className="flex flex-col gap-3">
            {userName ? (
              <>
                <div className="flex items-center gap-2 text-gray-600">
                  <UserOutlined />
                  <span>{userName}</span>
                </div>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                >
                  <LoginOutlined />
                  Login
                </a>
                <div className="flex items-center gap-2 text-gray-600">
                  <UserSwitchOutlined />
                  <span>Guest</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
