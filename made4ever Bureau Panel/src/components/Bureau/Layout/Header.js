import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/Made4Ever New Logo (400 x 150 px) (3).png";
import { User, LogOut, Settings, CreditCard } from "lucide-react";
import Swal from "sweetalert2";
import EditMspProfileModal from "./edit_profije";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // 👈 Detects current route automatically

const user = JSON.parse(localStorage.getItem('user'));

const navigate=useNavigate()




  const navigation = [
    { name: "Dashboard", href: "/buerau-dashboard" },
    { name: "Profiles", href: "/profiles" },
    { name: "Matches", href: "/matches" },
    { name: "Billing", href: "/billing" },
  ];


    const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton:"swal-confirm-btn" 
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire({
          icon: "success",
          title: "Logged out!",
          text: "You have been successfully logged out.",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      }
    });
  };

  const [openEdit, setOpenEdit] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Made For Ever Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-sm font-semibold transition-colors duration-300 group ${
                    isActive ? "text-red-600" : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300 group-hover:w-full ${
                      isActive ? "w-full" : ""
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Credits */}
            <span className="hidden sm:inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              💎 {user?.credits ?? 0} Credits
            </span>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center font-semibold text-gray-700 hover:shadow-md transition-all"
              >
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 animate-fadeIn z-50">
                  <div className="border-b pb-3 mb-2">
                    <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.bureauName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      <button onClick={()=>setOpenEdit(true)} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>Profile</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span>Billing</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition">
                        <Settings className="h-4 w-4 text-gray-500" />
                        <span>Settings</span>
                      </button>
                    </li>
                    <li className="border-t pt-2 mt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="h-4 w-4 text-red-600" />
                        <span>Log out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-red-600 focus:outline-none"
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
  <EditMspProfileModal open={openEdit} handleClose={() => setOpenEdit(false)} mspData={user}/>
    </header>
  );
};

export default Header;
