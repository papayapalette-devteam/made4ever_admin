import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

import Admindashboard from "./components/Admin/admindashboard";
import EducationGroup from "./components/Admin/Users_Group/Education_Group";
import MotherTongue from "./components/Admin/Users_Group/Mother_Tongue";
import IncomeGroup from "./components/Admin/Users_Group/Income_Group";
import CityGroup from "./components/Admin/Users_Group/City_Group";
import StateGroup from "./components/Admin/Users_Group/State_Group";
import CountryGroup from "./components/Admin/Users_Group/Country_Group";
import ReligionGroup from "./components/Admin/Users_Group/Religion_Group";
import CastGroup from "./components/Admin/Users_Group/Cast_Group";
import GothraGroup from "./components/Admin/Users_Group/Gothra_Group";
import PropertyType from "./components/Admin/Users_Group/Property_Type";
import ResidenceType from "./components/Admin/Users_Group/Residence_Type";
import EducationSpecialization from "./components/Admin/Users_Group/Education_Specialization";
import Occupation from "./components/Admin/Users_Group/Occupation";
import OccupationFunctionalArea from "./components/Admin/Users_Group/Occupation_Functional_Area";
import OccupationRole from "./components/Admin/Users_Group/Occupation_Role";
import VerifyUserEmail from "./components/Admin/Users_Group/Verify_User_Email";
import VerifyMspEmail from "./components/Admin/Users_Group/Verify_Msp_Email";
import Msp from "./components/Admin/Users_Data/Msp";
import MspVideo from "./components/Admin/Other_Forms/Msp_Video";
import MspGallary from "./components/Admin/Other_Forms/Msp_Gallary";
import MspEventImage from "./components/Admin/Other_Forms/Msp_Event_Image";
import MspHeaderText from "./components/Admin/Other_Forms/Msp_Header_Text";
import WonderfulWeddingPlanners from "./components/Admin/Wedding_Friends/Wonderful_Wedding_Planners";
import VideoPhotography from "./components/Admin/Wedding_Friends/Video_Photography";
import LovelyWeddingLocation from "./components/Admin/Wedding_Friends/Lovely_Wedding_Location";
import FabulousFlorals from "./components/Admin/Wedding_Friends/Fabulous_Florals";
import CreativeCatering from "./components/Admin/Wedding_Friends/Creative_Catering";
import Musicians from "./components/Admin/Wedding_Friends/Musicians";
import DressMaterials from "./components/Admin/Wedding_Friends/Dress_Materials";
import EventProduction from "./components/Admin/Wedding_Friends/Event_Production";
import Jwellers from "./components/Admin/Wedding_Friends/Jwellers";
import SignIn from "./components/other component/signin";
import ProtectedRoute from "./components/other component/protected_route";
import SubAdmin from "./components/Admin/SubAdmin/create_subadmin";
import PaymentDetails from "./components/Admin/PaymentDetails/payment";
import PropertySize from "./components/Admin/Users_Group/property_size";



function App() {
  return (
   
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<SignIn/>}></Route>
    
      <Route element={<ProtectedRoute />}>
        <Route path="/admin-dashboard" element={<Admindashboard/>}></Route>
        {/*==================== user Group section ==================================*/}

        <Route path="/education-group" element={<EducationGroup/>}></Route>
        <Route path="/income-group" element={<IncomeGroup/>}></Route>
        <Route path="/city-group" element={<CityGroup/>}></Route>
        <Route path="/state-group" element={<StateGroup/>}></Route>
        <Route path="/country-group" element={<CountryGroup/>}></Route>
        <Route path="/religion-group" element={<ReligionGroup/>}></Route>
        <Route path="/cast-group" element={<CastGroup/>}></Route>
        <Route path="/gothra-group" element={<GothraGroup/>}></Route>
        <Route path="/property-type" element={<PropertyType/>}></Route>
        <Route path="/property-size" element={<PropertySize/>}></Route>
        <Route path="/residence-type" element={<ResidenceType/>}></Route>
        <Route path="/mother-tongue" element={<MotherTongue/>}></Route>
        <Route path="/education-specialization" element={<EducationSpecialization/>}></Route>
        <Route path="/occupation" element={<Occupation/>}></Route>
        <Route path="/occupation-functional-area" element={<OccupationFunctionalArea/>}></Route>
        <Route path="/occupation-role" element={<OccupationRole/>}></Route>
        <Route path="/verify-user-email" element={<VerifyUserEmail/>}></Route>
        <Route path="/verify-msp-email" element={<VerifyMspEmail/>}></Route>
        
        {/*===================== user group section route end ===========================*/}

      {/* ======================Wedding Friends section routes start ====================*/}

      <Route path="/wonderfull-wedding-planners" element={<WonderfulWeddingPlanners/>}></Route>
      <Route path="/video-photography" element={<VideoPhotography/>}></Route>
      <Route path="/weddeing-location" element={<LovelyWeddingLocation/>}></Route>
      <Route path="/fabulous-florals" element={<FabulousFlorals/>}></Route>
      <Route path="/creative-catering" element={<CreativeCatering/>}></Route>
      <Route path="/musicians" element={<Musicians/>}></Route>
      <Route path="/dress-material" element={<DressMaterials/>}></Route>
      <Route path="/event-production" element={<EventProduction/>}></Route>
      <Route path="/jwellers" element={<Jwellers/>}></Route>

      {/* ======================Wedding Friends section routes end ====================*/}


      {/*===================== users data section route start ===========================*/}

       <Route path="/msp" element={<Msp/>}></Route>

      {/*===================== users data section route end ===========================*/}

      {/*===================== create sub-admin route start ===========================*/}

       <Route path="/sub-admin" element={<SubAdmin/>}></Route>

      {/*===================== create sub-admin route end ===========================*/}

      {/*=============================== other routes start============================ */}

        <Route path="/msp-video" element={<MspVideo/>}></Route>
        <Route path="/msp-gallary" element={<MspGallary/>}></Route>
        <Route path="/msp-event-image" element={<MspEventImage/>}></Route>
        <Route path="/msp-header-text" element={<MspHeaderText/>}></Route>

      {/*============================== other routes end==================================== */}

            {/*=============================== payment routes start============================ */}

        <Route path="/payment-details" element={<PaymentDetails/>}></Route>

      {/*============================== payment routes end==================================== */}
    </Route>

      </Routes>
   
      
        
    </BrowserRouter>

   
  );
}

export default App;
