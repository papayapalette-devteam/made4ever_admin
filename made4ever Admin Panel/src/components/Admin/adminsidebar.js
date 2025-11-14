import React, { useState, useEffect } from "react";
import "../Admin/admincss/adminsidebar.css";
import logo from '../Admin/images/Made4Ever New Logo (600 x 300 px) (1).png'
import usersgroup from "../Admin/images/group.png";
import mspvideo from "../Admin/images/video-camera.png";
import mspgallary from "../Admin/images/gallary.png";
import mspeventimage from "../Admin/images/picture.png";
import headingtext from "../Admin/images/heading.png";
import mspmatch from "../Admin/images/distance-love.png";
import paymentdetails from "../Admin/images/credit-card.png";
import dashboardicon from "../Admin/images/dashboard new.png";
import logout from "../Admin/images/logout.png";
import addhospitalicon from "../Admin/images/user-plus-alt-1-svgrepo-com 1.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const menuItems = [
  { icon: dashboardicon, label: "Dashboard", path: "/admin-dashboard" },
  { icon: mspvideo, label: "MSP Data", path: "/msp" },
  { icon: usersgroup, label: "Create Sub-Admin", path: "/sub-admin" },
 
  {
    icon: usersgroup,
    label: "Users Group",
    children: [
  { icon: addhospitalicon, label: "Education Group", path: "/education-group" },
  { icon: addhospitalicon, label: "Income Group", path: "/income-group" },
  { icon: addhospitalicon, label: "City Group", path: "/city-group" },
  { icon: addhospitalicon, label: "State Group", path: "/state-group" },
  { icon: addhospitalicon, label: "Country Group", path: "/country-group" },
  { icon: addhospitalicon, label: "Mother Tongue", path: "/mother-tongue" },
  { icon: addhospitalicon, label: "Religion Group", path: "/religion-group" },
  { icon: addhospitalicon, label: "Caste Group", path: "/cast-group" },
  { icon: addhospitalicon, label: "Gothra Group", path: "/gothra-group" },
  { icon: addhospitalicon, label: "Property Type", path: "/property-type" },
  { icon: addhospitalicon, label: "Residence Type", path: "/residence-type" },
  { icon: addhospitalicon, label: "Education Specialization", path: "/education-specialization" },
  { icon: addhospitalicon, label: "Occupation", path: "/occupation" },
  { icon: addhospitalicon, label: "Occupation Functional Area", path: "/occupation-functional-area" },
  { icon: addhospitalicon, label: "Occupation Role", path: "/occupation-role" },
  { icon: addhospitalicon, label: "Verify User Email", path: "/verify-user-email" },
  { icon: addhospitalicon, label: "Verify Msp Email", path: "/verify-msp-email" },
  ]
  },
  { icon: mspvideo, label: "MSP Video", path: "/msp-video" },
  { icon: mspgallary, label: "MSP Gallary", path: "/msp-gallary" },
  { icon: mspeventimage, label: "MSP Event Image", path: "/msp-event-image" },
  { icon: headingtext, label: "MSP Header Text", path: "/msp-header-text" },
  { icon: mspmatch, label: "Matches", path: "/event-master" },
  { icon: paymentdetails, label: "Payment Details", path: "/event-master" },
  { icon: logout, label: "Logout" },
];

const Adminsidebar = () => {
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

        <ul className="sidebar-menu">
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
                 className={`sidebar-item ${
                item.label.toLowerCase() === "logout" ? "logout-item" : ""
              } ${openDropdown === idx ? "active" : ""}`}
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
