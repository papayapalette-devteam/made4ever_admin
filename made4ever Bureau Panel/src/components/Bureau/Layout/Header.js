import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/Made4Ever New Logo (600 x 300 px) (1).png";
import { User, LogOut, Settings, CreditCard } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // 👈 Detects current route automatically

  const user = {
    name: "Rajesh Kumar",
    email: "rajesh@matrimonials.com",
    credits: 150,
    bureauName: "Perfect Match Bureau",
  };

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Profiles", href: "/profiles" },
    { name: "Matches", href: "/matches" },
    { name: "Billing", href: "/billing" },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Made For Ever Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href; // ✅ Detect active
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive
                      ? "text-red-600 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-red-600"
                      : "text-gray-600 hover:text-red-600"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right: User Info + Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Credits */}
            <span className="hidden sm:inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
              {user.credits} Credits
            </span>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700 hover:bg-gray-300 transition"
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg p-3">
                  <div className="border-b pb-2 mb-2">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.bureauName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 text-left p-0">
                    <li>
                      <button className="w-full flex gap-2 px-2 py-1 rounded hover:bg-gray-100">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>Profile</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span>Billing</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100">
                        <Settings className="h-4 w-4 text-gray-500" />
                        <span>Settings</span>
                      </button>
                    </li>
                    <li className="border-t pt-1 mt-1">
                      <button className="w-full flex items-center gap-2 px-2 py-1 rounded text-red-600 hover:bg-gray-100">
                        <LogOut className="h-4 w-4 text-red-600" />
                        <span>Log out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "text-red-600 bg-gray-50 border-l-4 border-red-500"
                      : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
