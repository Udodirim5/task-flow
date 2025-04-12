import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOnMobile = (): void => {
    setIsMenuOpen(prev => !prev);
  }

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-indigo-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
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
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle menu"
              onClick={toggleMenuOnMobile}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* User Profile - Hidden on mobile when menu is open */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="p-2 rounded-full hover:bg-indigo-800 transition-colors duration-200"
                aria-label="Toggle user profile"
              >
                <svg
                  className="w-6 h-6 text-indigo-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-indigo-100 font-medium">
                JS
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Hidden by default */}
        <div className={`md:hidden mt-4 pb-4 ${isMenuOpen ? "block" : "hidden"}`}>

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
