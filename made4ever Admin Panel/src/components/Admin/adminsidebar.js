import React, { useState, useEffect } from "react";
import "../Admin/admincss/adminsidebar.css";
import logo from '../Admin/images/Made4Ever New Logo (400 x 150 px).png'
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

const menuItems = [
  { icon: dashboardicon, label: "Dashboard", path: "/admin-dashboard" },
  { icon: mspdata, label: "MSP Data", path: "/msp" },
  { icon: subadmin, label: "Create Sub-Admin", path: "/sub-admin" },
 
  {
    icon: usersgroup,
    label: "Users Group",
    children: [
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/graduation-cap.png",
        label: "Education Group",
        path: "/education-group",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/money-bag.png",
        label: "Income Group",
        path: "/income-group",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/city.png",
        label: "City Group",
        path: "/city-group",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/map.png",
        label: "State Group",
        path: "/state-group",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/globe-earth.png",
        label: "Country Group",
        path: "/country-group",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/speech-bubble.png",
        label: "Mother Tongue",
        path: "/mother-tongue",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/chapel.png",
        label: "Religion Group",
        path: "/religion-group",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/groups.png",
        label: "Caste Group",
        path: "/cast-group",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/genealogy.png",
        label: "Gothra Group",
        path: "/gothra-group",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/home.png",
        label: "Property Type",
        path: "/property-type",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/floor-plan.png",
        label: "Property Size",
        path: "/property-size",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/apartment.png",
        label: "Residence Type",
        path: "/residence-type",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/book.png",
        label: "Education Specialization",
        path: "/education-specialization",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/businessman.png",
        label: "Occupation",
        path: "/occupation",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/services.png",
        label: "Occupation Functional Area",
        path: "/occupation-functional-area",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/technical-support.png",
        label: "Occupation Role",
        path: "/occupation-role",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/email-open.png",
        label: "Verify User Email",
        path: "/verify-user-email",
      },
      {
        icon: "https://img.icons8.com/ios-filled/50/000000/secured-letter.png",
        label: "Verify MSP Email",
        path: "/verify-msp-email",
      },
    
  ]
  },
  { icon: mspvideo, label: "MSP Video", path: "/msp-video" },
  { icon: mspgallary, label: "MSP Gallary", path: "/msp-gallary" },
  { icon: mspeventimage, label: "MSP Event Image", path: "/msp-event-image" },
  { icon: headingtext, label: "MSP Header Text", path: "/msp-header-text" },
  { icon: mspmatch, label: "Matches", path: "/event-master" },
  { icon: mspmatch, label: "Find Matches", path: "/find-matches" },
  { icon: paymentdetails, label: "Payment Details", path: "/payment-details" },
  { icon: logout, label: "Logout" },
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
          <button
            className="collapse-btn"
            onClick={()=>toggleSidebar()}
          >
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
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className="sidebar-icon"
                  style={{ height: "18px", width: "18px" }}
                />
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
                      <img
                        src={child.icon}
                        alt={`${child.label} icon`}
                        className="sidebar-icon"
                        style={{ height: "16px", width: "16px" }}
                      />
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
