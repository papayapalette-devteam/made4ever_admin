import React, { useEffect, useState } from "react";
import "../Admin/admincss/admindashboard.css";
import "../Admin/admincss/common_config.css";
import Adminheader from "./adminheader";
import Adminsidebar from "./adminsidebar";
import continenticon from '../Admin/images/continent-svgrepo-com 1 (2).png'
import countryflagicon from '../Admin/images/country-flag-flag02-svgrepo-com 1 (2).png'
import countryflagicon1 from '../Admin/images/country-flag-flags-svgrepo-com 1 (1).png'
import partnerhospitalicon from '../Admin/images/building-healthy-hospital-svgrepo-com 1.png'
import medicalcollegesicon from '../Admin/images/university-svgrepo-com 1.png'
import docotorsicon from '../Admin/images/doctor-m-svgrepo-com 1.png'
import medicalassociationicon from '../Admin/images/medical-kit-svgrepo-com 1.png'
import patientreferralsicon from '../Admin/images/online-health-doctor-patient-video-consultation-medical-2-svgrepo-com 1.png'
import deleteicon from '../Admin/images/delete-svgrepo-com 1.png'
import api from "../../api";

const overviewData = [
  { icon: continenticon, bg: "#6C61E7", title: "Continent", value: "0.5k" },
  { icon: countryflagicon, bg: "#FAA13B", title: "Countries", value: "0.1k" },
  { icon: countryflagicon1, bg: "#40B679", title: "Countries Group", value: "0.2k" },
  { icon: partnerhospitalicon, bg: "#37C7A5", title: "Partner Msp", value: "1k" },
  { icon: medicalcollegesicon, bg: "#F46868", title: "Msp Match", value: "10.5k" },
  { icon: docotorsicon, bg: "#59C4E8", title: "Users", value: "20k" },
  { icon: medicalassociationicon, bg: "#20B4B9", title: "Wedding Planners", value: "1.2k" },
  { icon: patientreferralsicon, bg: "#374DA4", title: "Msp Referrals", value: "1.3" },
];




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
        <div className="overview-card" key={idx} style={{ background: card.bg }}>
          <div className="overview-details">
            <span className="overview-title">{card.title}</span>
            <span className="overview-value">{card.value}</span>
          </div>
            <div className="overview-icon">
           <img src={card.icon} alt=""></img>
          </div>
        </div>
      ))}
    </div>
    <h3 className="doctors-title">MSP List</h3>
    <div className="table-responsive">
      <table className="doctors-table">
        <thead >
          <tr style={{backgroundColor:"#525FE1"}}>
            <th style={{backgroundColor:"#525FE1",color:"white",fontWeight:"normal"}}>Owner Name</th>
            <th style={{backgroundColor:"#525FE1",color:"white",fontWeight:"normal"}}>Phone Number</th>
            <th style={{backgroundColor:"#525FE1",color:"white",fontWeight:"normal"}}>Email</th>
            <th style={{backgroundColor:"#525FE1",color:"white",fontWeight:"normal"}}>MSP</th>
            <th style={{backgroundColor:"#525FE1",color:"white",fontWeight:"normal"}}>Action</th>
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
                <button className="view-profile-btn">
                  View Profile <i className="fa fa-angle-right"></i>
                </button>
                  <button className="delete-button">
                  <img src={deleteicon}></img>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  </div>
  </div>
    )
}

export default Admindashboard;
