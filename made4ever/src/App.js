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



function App() {
  return (
   
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Admindashboard/>}></Route>
    


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
        <Route path="/residence-type" element={<ResidenceType/>}></Route>
        <Route path="/mother-tongue" element={<MotherTongue/>}></Route>
        <Route path="/education-specialization" element={<EducationSpecialization/>}></Route>
        <Route path="/occupation" element={<Occupation/>}></Route>
        <Route path="/occupation-functional-area" element={<OccupationFunctionalArea/>}></Route>
        <Route path="/occupation-role" element={<OccupationRole/>}></Route>
        <Route path="/verify-user-email" element={<VerifyUserEmail/>}></Route>
        <Route path="/verify-msp-email" element={<VerifyMspEmail/>}></Route>
        
        {/*===================== user group section route end ===========================*/}
      
      {/*===================== users data section route start ===========================*/}

       <Route path="/msp" element={<Msp/>}></Route>

         {/*===================== users data section route end ===========================*/}


      </Routes>
      {/* <ActivePatient/> */}
      
        
    </BrowserRouter>

   
  );
}

export default App;
