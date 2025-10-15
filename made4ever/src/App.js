import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

import Admindashboard from "./components/Admin/admindashboard";
import EducationGroup from "./components/Admin/Users_Group/Education_Group";
import DosageMaster from "./components/Admin/Users_Group/dosage_master";
import DiseaseMaster from "./components/Admin/Users_Group/disease_master";
import AllergyMaster from "./components/Admin/Users_Group/City_Group";
import HabitMaster from "./components/Admin/Users_Group/habit_master";
import AllergyCategory from "./components/Admin/Users_Group/Income_Group";
import HabitCategory from "./components/Admin/Users_Group/habit_category";
import InvestigationCategory from "./components/Admin/Users_Group/investigation_category_master";
import InvestigationMaster from "./components/Admin/Users_Group/investigation_master";
import DiagnosisMaster from "./components/Admin/Users_Group/Country_Group";
import DiagnosisTypeMaster from "./components/Admin/Users_Group/diagnosis_type_master";
import LifestyleInterventionMaster from "./components/Admin/Users_Group/lifestyle_intervention_master";

import ComorbidityMaster from "./components/Admin/Users_Group/State_Group";
import IncomeGroup from "./components/Admin/Users_Group/Income_Group";
import CityGroup from "./components/Admin/Users_Group/City_Group";
import StateGroup from "./components/Admin/Users_Group/State_Group";
import CountryGroup from "./components/Admin/Users_Group/Country_Group";



function App() {
  return (
   
    <BrowserRouter>
      <Routes>
    

      

         <Route path="/" element={<Admindashboard/>}></Route>
    


        {/*==================== bizaario master section ==================================*/}

        <Route path="/education-group" element={<EducationGroup/>}></Route>
        <Route path="/income-group" element={<IncomeGroup/>}></Route>
        <Route path="/city-group" element={<CityGroup/>}></Route>
        <Route path="/state-group" element={<StateGroup/>}></Route>
        <Route path="/country-group" element={<CountryGroup/>}></Route>
        <Route path="/habit-category-master" element={<HabitCategory/>}></Route>
        <Route path="/habit-master" element={<HabitMaster/>}></Route>
        <Route path="/investigation-category-master" element={<InvestigationCategory/>}></Route>
        <Route path="/investigation-master" element={<InvestigationMaster/>}></Route>
        <Route path="/diagnosis-master" element={<DiagnosisMaster/>}></Route>
        <Route path="/diagnosis-type-master" element={<DiagnosisTypeMaster/>}></Route>
        <Route path="/lifestyle-intervention-master" element={<LifestyleInterventionMaster/>}></Route>
        <Route path="/comorbidity-master" element={<ComorbidityMaster/>}></Route>
        

        {/*===================== bizaario master section route end ===========================*/}


      </Routes>
      {/* <ActivePatient/> */}
      
        
    </BrowserRouter>

   
  );
}

export default App;
