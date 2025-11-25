import React, { useEffect, useState } from "react";
import "../Admin/admincss/admindashboard.css";
import "../Admin/admincss/common_config.css";
import Adminheader from "./adminheader";
import Adminsidebar from "./adminsidebar";
import continenticon from "../Admin/images/continent-svgrepo-com 1 (2).png";
import countryflagicon from "../Admin/images/country-flag-flag02-svgrepo-com 1 (2).png";
import countryflagicon1 from "../Admin/images/country-flag-flags-svgrepo-com 1 (1).png";
import partnerhospitalicon from "../Admin/images/building-healthy-hospital-svgrepo-com 1.png";
import medicalcollegesicon from "../Admin/images/university-svgrepo-com 1.png";
import docotorsicon from "../Admin/images/doctor-m-svgrepo-com 1.png";
import medicalassociationicon from "../Admin/images/medical-kit-svgrepo-com 1.png";
import patientreferralsicon from "../Admin/images/online-health-doctor-patient-video-consultation-medical-2-svgrepo-com 1.png";
import deleteicon from "../Admin/images/delete-svgrepo-com 1.png";
import api from "../../api";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Users,
  HeartHandshake,
  Building2,
  CreditCard,
  ShoppingBag,
  BarChart3,
  UsersRound,
  Share2,
} from "lucide-react";
import ProfileModal from "../other component/msp_profile_view";


const StatsCard = ({ title, value, description, icon, trend, bg }) => {
  return (
    <div
      className="overview-card
        rounded-xl p-4 shadow-sm 
        hover:shadow-md hover:-translate-y-1 
        transition-all duration-300 cursor-pointer
      "
      style={{
        background: `${bg}25`,
      }}
    >
      {/* TOP: Title + Icon */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>

        {icon && (
          <div className="h-8 w-8 flex items-center justify-center bg-white/60 rounded-lg text-gray-700">
            {icon}
          </div>
        )}
      </div>

      {/* MIDDLE: Value + Trend */}
      <div className="flex items-center justify-between mt-1">
        <div className="text-2xl font-bold text-gray-900">{value}</div>

        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      {/* BOTTOM: Description */}
      {description && (
        <div className="text-xs text-gray-600 mt-1">{description}</div>
      )}
    </div>
  );
};

function Admindashboard() {
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid pages start from 0
    pageSize: 10,
  });

  const [All_Msp_Data, setAll_Msp_Data] = useState([]);
  const getall_msp_data = async (
    pageNumber = paginationModel.page,
    limitNumber = paginationModel.pageSize
  ) => {
    try {
      const params = new URLSearchParams();

      // Pagination
      params.append("page", pageNumber + 1); // backend is 1-indexed
      params.append("limit", limitNumber);

      const resp = await api.get(`api/msp/Getmsp?${params.toString()}`);

      setAll_Msp_Data(resp.data.msp);
      setRowCount(resp.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getall_msp_data();
  }, []);

  const [All_Profile, setAll_Profile] = useState([]);
  const getall_user_profile = async () => {
    try {
     
      const resp = await api.get(`api/user/get-all-profile`);
      setAll_Profile(resp.data.total);
    } catch (error) {
      console.log(error);
    }
  };
    useEffect(() => {
    getall_user_profile();
  }, []);


   const [All_Matches, setAll_Matches] = useState([]);
    const fetchMatches = async () => {
    try {
      const res = await api.get("/api/user/accept-profile");
      
      if (res.status === 200 && Array.isArray(res.data.data)) {
        setAll_Matches(res.data.count);
      }
    } catch (error) {
    
        console.log(error);
    } 
  };

  useEffect(() => {
    fetchMatches();
  }, []);



  const overviewData = [
  {
    icon: <Users size={22} />,
    bg: "#6C61E7",
    title: "Profiles",
    value: All_Profile,
  },

  {
    icon: <HeartHandshake size={22} />,
    bg: "#FAA13B",
    title: "Matches",
    value: All_Matches,
  },

  {
    icon: <Building2 size={22} />,
    bg: "#40B679",
    title: "Marriage Bureau",
    value: rowCount,
  },

  {
    icon: <CreditCard size={22} />,
    bg: "#37C7A5",
    title: "Active Subscriptions",
    value: "1k",
  },

  {
    icon: <ShoppingBag size={22} />,
    bg: "#F46868",
    title: "Monthly Sales",
    value: "10.5k",
  },

  {
    icon: <BarChart3 size={22} />,
    bg: "#59C4E8",
    title: "Weekly Sales",
    value: "20k",
  },

  {
    icon: <UsersRound size={22} />,
    bg: "#20B4B9",
    title: "Wedding Planners",
    value: "1.2k",
  },

  {
    icon: <Share2 size={22} />,
    bg: "#374DA4",
    title: "Msp Referrals",
    value: "1.3k",
  },
];

// profile modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (doc) => {
    setSelectedUser(doc);
    setShowModal(true);
  };
  
  return (
    <div>
      <Adminheader />

      <div className="layout">
        <Adminsidebar />
        <div className="content-wrapper">
          <div className="main-content">
            <h2 className="dashboard-title">Overview</h2>
            <div className="overview-cards">
              {overviewData.map((card, idx) => (
                <StatsCard
                  title={card.title}
                  value={card.value}
                  description="Active profiles"
                  icon={card.icon}
                  trend={{ value: 12, isPositive: true }}
                  bg={card.bg}
                />
              ))}
            </div>
            <h3 className="doctors-title">MSP List</h3>
            <div className="table-responsive">
              <table className="doctors-table">
                <thead>
                  <tr style={{ backgroundColor: "#525FE1" }}>
                    <th
                      style={{
                        backgroundColor: "#525FE1",
                        color: "white",
                        fontWeight: "normal",
                      }}
                    >
                      Owner Name
                    </th>
                    <th
                      style={{
                        backgroundColor: "#525FE1",
                        color: "white",
                        fontWeight: "normal",
                      }}
                    >
                      Phone Number
                    </th>
                    <th
                      style={{
                        backgroundColor: "#525FE1",
                        color: "white",
                        fontWeight: "normal",
                      }}
                    >
                      Email
                    </th>
                    <th
                      style={{
                        backgroundColor: "#525FE1",
                        color: "white",
                        fontWeight: "normal",
                      }}
                    >
                      MSP
                    </th>
                    <th
                      style={{
                        backgroundColor: "#525FE1",
                        color: "white",
                        fontWeight: "normal",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {All_Msp_Data?.map((doc, idx) => (
                    <tr key={idx}>
                      <td>
                        <span className="doctor-link">{doc.name}</span>
                      </td>
                      <td>{doc.mobile_number}</td>
                      <td>{doc.email}</td>
                      <td>{doc.registered_business_name}</td>
                      <td className="action-button">
                        <button className="view-profile-btn" onClick={() => openModal(doc)}>
                          View Profile <i className="fa fa-angle-right"></i>
                        </button>
                   
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
               {/* Modal Component */}
                <ProfileModal
                  show={showModal}
                  onHide={() => setShowModal(false)}
                  data={selectedUser}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;
