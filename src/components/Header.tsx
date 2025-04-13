import { useState } from "react";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { Bell, Clipboard, Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setIsMenuOpen(false));

  const toggleMenuOnMobile = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-indigo-900 to-gray-900 shadow-lg z-5 ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <Clipboard className="w-8 h-8 text-indigo-300" />

            <h1 className="text-2xl font-bold text-white">
              Task<span className="text-indigo-300">Flow</span>
            </h1>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className="text-indigo-200 hover:text-white transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="#"
              className="text-indigo-200 hover:text-white transition-colors duration-200 font-medium"
            >
              Projects
            </Link>
            <Link
              to="/calendar"
              className="text-indigo-200 hover:text-white transition-colors duration-200 font-medium"
            >
              Calendar
            </Link>
            <Link
              to="#"
              className="text-indigo-200 hover:text-white transition-colors duration-200 font-medium"
            >
              Team
            </Link>
          </nav>

          {/* Mobile menu button and User Profile */}
          <div ref={ref} className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle menu"
              onClick={toggleMenuOnMobile}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* User Profile - Hidden on mobile when menu is open */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="p-2 rounded-full hover:bg-indigo-800 transition-colors duration-200"
                aria-label="Toggle user profile"
              >
                <Bell className="w-6 h-6 text-indigo-200" />
              </button>
              <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-indigo-100 font-medium">
                JS
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Hidden by default */}
        <div
          className={`md:hidden mt-4 pb-4 ${isMenuOpen ? "block" : "hidden"}`}
        >
          <div className="flex flex-col space-y-3 px-2">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="#"
              className="block px-3 py-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800 font-medium"
            >
              Projects
            </Link>
            <Link
              to="calendar"
              className="block px-3 py-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800 font-medium"
            >
              Calendar
            </Link>
            <Link
              to="#"
              className="block px-3 py-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800 font-medium"
            >
              Team
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
