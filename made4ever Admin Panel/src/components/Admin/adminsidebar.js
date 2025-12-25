import React, { useState, useEffect } from "react";
import "../Admin/admincss/adminsidebar.css";
import logo from "../Admin/images/Made4Ever New Logo (400 x 150 px).png";
import usersgroup from "../Admin/images/icons8-user-group-96.png";
import subadmin from "../Admin/images/icons8-administrator-male-100.png";
import mspvideo from "../Admin/images/icons8-video-96.png";
import mspdata from "../Admin/images/icons8-data-quality-100.png";
import mspgallary from "../Admin/images/icons8-gallery-96.png";
import mspeventimage from "../Admin/images/icons8-image-96.png";
import headingtext from "../Admin/images/icons8-header-1-100.png";
import mspmatch from "../Admin/images/icons8-match-100.png";
import paymentdetails from "../Admin/images/icons8-payment-80.png";
import dashboardicon from "../Admin/images/icons8-dashboard-96.png";
import logout from "../Admin/images/logout.png";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  MdDashboard,
  MdGroup,
  MdCastForEducation,
  MdOutlinePayments,
  MdEmail,
  MdLogout,
  MdOutlineWork,
  MdOutlineBusinessCenter,
  MdOutlineHome,
  MdMap,
  MdManageAccounts  ,
  MdEditNote ,
  MdDeleteOutline,
  MdOutlineSettings 
} from "react-icons/md";

import {
  FaWallet,
  FaCity,
  FaFlag,
  FaGlobeAsia,
  FaPrayingHands,
  FaUsers,
  FaBuildingUser,
} from "react-icons/fa";

import { GiFamilyTree, GiResize } from "react-icons/gi";
import { BiSolidVideos, BiImageAdd, BiBookContent } from "react-icons/bi";
import { TbTextCaption } from "react-icons/tb";
import { RiTeamLine, RiBuilding2Fill } from "react-icons/ri";
import { HiOutlineMailOpen } from "react-icons/hi";

const menuItems = [
  {
    icon: <MdDashboard size={20} />,
    label: "Dashboard",
    path: "/admin-dashboard",
  },
  { icon: <FaWallet size={20} />, label: "MSP Data", path: "/msp" },
  {
    icon: <RiTeamLine size={20} />,
    label: "Create Sub-Admin",
    path: "/sub-admin",
  },

  {
    icon: <MdGroup size={20} />,
    label: "Users Group",
    children: [
      {
        icon: <MdCastForEducation size={20} />,
        label: "Education Group",
        path: "/education-group",
      },
      {
        icon: <MdOutlinePayments size={20} />,
        label: "Income Group",
        path: "/income-group",
      },
      { icon: <FaCity size={20} />, label: "City Group", path: "/city-group" },
      { icon: <MdMap size={20} />, label: "State Group", path: "/state-group" },
      {
        icon: <FaGlobeAsia size={20} />,
        label: "Country Group",
        path: "/country-group",
      },
      {
        icon: <MdEmail size={20} />,
        label: "Mother Tongue",
        path: "/mother-tongue",
      },
      {
        icon: <FaPrayingHands size={20} />,
        label: "Religion Group",
        path: "/religion-group",
      },
      {
        icon: <MdEmail size={20} />,
        label: "Community Group",
        path: "/community-group",
      },
      {
        icon: <FaUsers size={20} />,
        label: "Caste Group",
        path: "/cast-group",
      },
      {
        icon: <GiFamilyTree size={20} />,
        label: "Gothra Group",
        path: "/gothra-group",
      },
      {
        icon: <MdOutlineHome size={20} />,
        label: "Property Type",
        path: "/property-type",
      },
      {
        icon: <GiResize size={20} />,
        label: "Property Size",
        path: "/property-size",
      },
      {
        icon: <FaUsers size={20} />,
        label: "Residence Type",
        path: "/residence-type",
      },
      {
        icon: <BiBookContent size={20} />,
        label: "Education Specialization",
        path: "/education-specialization",
      },
      {
        icon: <MdOutlineWork size={20} />,
        label: "Occupation",
        path: "/occupation",
      },
      {
        icon: <MdOutlineBusinessCenter size={20} />,
        label: "Occupation Functional Area",
        path: "/occupation-functional-area",
      },
      {
        icon: <RiBuilding2Fill size={20} />,
        label: "Occupation Role",
        path: "/occupation-role",
      },
      {
        icon: <HiOutlineMailOpen size={20} />,
        label: "Verify User Email",
        path: "/verify-user-email",
      },
      {
        icon: <MdEmail size={20} />,
        label: "Verify MSP Email",
        path: "/verify-msp-email",
      },
    ],
  },

  { icon: <BiSolidVideos size={20} />, label: "MSP Video", path: "/msp-video" },
  {
    icon: <BiImageAdd size={20} />,
    label: "MSP Gallery",
    path: "/msp-gallary",
  },
  {
    icon: <FaUsers size={20} />,
    label: "MSP Event Image",
    path: "/msp-event-image",
  },
  {
    icon: <TbTextCaption size={20} />,
    label: "MSP Header Text",
    path: "/msp-header-text",
  },
  { icon: <FaUsers size={20} />, label: "Matches", path: "/event-master" },
  { icon: <MdGroup size={20} />, label: "Find Matches", path: "/find-matches" },
  { icon: <MdManageAccounts   size={20} />, label: "View All Profiles", path: "/view-profiles" },
  { icon: <MdEditNote  nessCenter  size={20} />, label: "Create Blogs", path: "/add-blog" },
  { icon: <MdDeleteOutline   nessCenter  size={20} />, label: "Recycle Bin", path: "/recycle-bin" },
  {
    icon: <MdOutlinePayments size={20} />,
    label: "Payment Details",
    path: "/payment-details",
  },
  {
    icon: <MdOutlineSettings size={20} />,
    label: "Settings",
    path: "/settings",
  },
  { icon: <MdLogout size={20} />, label: "Logout" },
];

const Adminsidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(
    Number(localStorage.getItem("openDropdown")) || null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔹 NEW STATE
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    document.body.classList.toggle("sidebar-collapsed");
  };

  const handleDropdownClick = (idx) => {
    const newDropdown = openDropdown === idx ? null : idx;
    setOpenDropdown(newDropdown);
    localStorage.setItem("openDropdown", newDropdown ?? "");
  };

  const logout = () => {
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
        cancelButton: "swal-confirm-btn",
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobileMenuOpen &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Toggle button for mobile */}
      <button
        className="menu-toggle lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar ${isMobileMenuOpen ? "sidebar-open" : ""} ${
          isCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <div className="sidebar-header">
          <img
            src={logo}
            alt="Logo"
            className="w-full h-auto block object-cover"
          />

          {/* 🔹 Collapse button */}
          <button className="collapse-btn" onClick={() => toggleSidebar()}>
            {isCollapsed ? "»" : "«"}
          </button>
        </div>

        <ul className="sidebar-menu mt-2">
          {menuItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <li
                onClick={() => {
                  if (item.label.toLowerCase() === "logout") {
                    logout();
                  } else if (item.children) {
                    handleDropdownClick(idx);
                  } else {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={`sidebar-item 
                  ${item.label.toLowerCase() === "logout" ? "logout-item" : ""}
                  ${isActive(item.path) ? "active-menu" : ""}
                  ${openDropdown === idx ? "active-dropdown" : ""}
                `}
              >
                <div className="sidebar-icon">{item.icon}</div>

                {!isCollapsed && (
                  <span className="sidebar-label">{item.label}</span>
                )}
                {/* 🔹 Add + / - icon if item has submenu */}
                {!isCollapsed && item.children && (
                  <span className="submenu-toggle-icon text-lg font-bold ml-auto">
                    {openDropdown === idx ? "−" : "+"}
                  </span>
                )}
              </li>

              {item.children && openDropdown === idx && !isCollapsed && (
                <ul className="sidebar-submenu">
                  {item.children.map((child, cIdx) => (
                    <li
                      key={cIdx}
                      className="sidebar-subitem"
                      onClick={() => navigate(child.path)}
                    >
                      <div className="sidebar-icon">{child.icon}</div>
                      <span>{child.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Adminsidebar;
