import React, { useState, useEffect } from "react";
import "../Admin/admincss/adminsidebar.css";
import logo from '../Admin/images/Made4Ever New Logo (600 x 300 px) (1).png'
import usersgroup from "../Admin/images/group.png";
import mspvideo from "../Admin/images/video-camera.png";
import mspgallary from "../Admin/images/gallary.png";
import mspeventimage from "../Admin/images/picture.png";
import headingtext from "../Admin/images/heading.png";
import weddingfriends from "../Admin/images/friend.png";
import mspmatch from "../Admin/images/distance-love.png";
import paymentdetails from "../Admin/images/credit-card.png";
import mobileloginotp from "../Admin/images/one-time-password.png";
import updateage from "../Admin/images/rotation.png";
import dashboardicon from "../Admin/images/dashboard new.png";
import user from "../Admin/images/user.png";
import logout from "../Admin/images/logout.png";
import addhospitalicon from "../Admin/images/user-plus-alt-1-svgrepo-com 1.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const menuItems = [
  { icon: dashboardicon, label: "Dashboard", path: "/" },
  {
    icon: user,
    label: "Users Data",
    children: [
      { icon: addhospitalicon, label: "Msp", path: "/patient-referral-type" }, 
      { icon: addhospitalicon, label: "Users", path: "/symptom-class-master" },
 
    ],
  },
   {
    icon: usersgroup,
    label: "Users Group",
    children: [
  { icon: addhospitalicon, label: "Education Group", path: "/education-group" },
  { icon: addhospitalicon, label: "Income Group", path: "/income-group" },
  { icon: addhospitalicon, label: "City Group", path: "/city-group" },
  { icon: addhospitalicon, label: "State Group", path: "/state-group" },
  { icon: addhospitalicon, label: "Country Group", path: "/country-group" },
  { icon: addhospitalicon, label: "Mother Tongue", path: "/pharmaceutical-salt-master" },
  { icon: addhospitalicon, label: "Religion Group", path: "/dosage-type-master" },
  { icon: addhospitalicon, label: "Caste Group", path: "/medicine-frequency-master" },
  { icon: addhospitalicon, label: "Gothra Group", path: "/therapy-master" },
  { icon: addhospitalicon, label: "Property Group", path: "/procedure-master" },
  { icon: addhospitalicon, label: "Residence Type", path: "/disease-master" },
  { icon: addhospitalicon, label: "Education Specialization", path: "/allergy-category-master" },
  { icon: addhospitalicon, label: "Occupation", path: "/allergy-master" },
  { icon: addhospitalicon, label: "Occupation Functional Area", path: "/truma-category-master" },
  { icon: addhospitalicon, label: "Occupation Role", path: "/trauma-master" },
  { icon: addhospitalicon, label: "Verify User Email", path: "/occupation-category-master" },
  { icon: addhospitalicon, label: "Verify Msp Email", path: "/occupation-master" },
  ]
  },

  { icon: mspvideo, label: "MSP Video", path: "/content-master" },
  { icon: mspgallary, label: "MSP Gallary", path: "/event-master" },
  { icon: mspeventimage, label: "MSP Event Image", path: "/event-master" },
  { icon: headingtext, label: "MSP Header Text", path: "/event-master" },

  {
    icon: weddingfriends,
    label: "Wedding Friends",
    children: [
  { icon: addhospitalicon, label: "Wonderfull Wedding Planners", path: "/patient-referral-type" },
  { icon: addhospitalicon, label: "Video And Photography Phenoms", path: "/symptom-class-master" },
  { icon: addhospitalicon, label: "Lovely Wedding Locations", path: "/symptom-master" },
  { icon: addhospitalicon, label: "Fabulous Florals", path: "/aggravating-factor-master" },
  { icon: addhospitalicon, label: "Creative Catering And Cakes", path: "/pharmaceutical-salt-type-master" },
  { icon: addhospitalicon, label: "Marvelous Musicians/Djs And Entertainment Booking Agents", path: "/pharmaceutical-salt-master" },
  { icon: addhospitalicon, label: "Wedding Dress Materials", path: "/dosage-type-master" },
  { icon: addhospitalicon, label: "Events Production And Rentals", path: "/medicine-frequency-master" },
  { icon: addhospitalicon, label: "Jwellers", path: "/therapy-master" },
    ],
  },

  { icon: mspmatch, label: "MSP Match", path: "/event-master" },
  { icon: paymentdetails, label: "Payment Details", path: "/event-master" },
  { icon: mobileloginotp, label: "Mobile Login Otp", path: "/event-master" },

  {
    icon: updateage,
    label: "Update Age",
    children: [
  { icon: addhospitalicon, label: "Update Msp User Age", path: "/patient-referral-type" },
  { icon: addhospitalicon, label: "Update Partner Preference Age", path: "/symptom-class-master" },
    ],
  },
    

  
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
      icon: "success",
      title: "Logout",
      text: "You are successfully logged out.",
      showConfirmButton: true,
      customClass: { confirmButton: "my-swal-button" },
    }).then(() => navigate("/"));
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
