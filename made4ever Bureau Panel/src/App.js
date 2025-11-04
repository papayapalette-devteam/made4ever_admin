import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";


import Dashboard from "./components/Bureau/Dashboard";
import ProfilesPage from "./components/Bureau/Profiles/profile";
import NewProfileForm from "./components/Bureau/Profiles/add_new_profile";
import MatchesPage from "./components/Bureau/Matches/matches";
import BillingPage from "./components/Bureau/Billing/billing";
import UserProfile from "./components/Bureau/Profiles/view_profile";




function App() {
  return (
   
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Dashboard/>}></Route>

         <Route path="/profiles" element={<ProfilesPage/>}></Route>
         <Route path="/view-profiles" element={<UserProfile/>}></Route>
         <Route path="/add-new-profile" element={<NewProfileForm/>}></Route>
         
         <Route path="/matches" element={<MatchesPage/>}></Route>
         <Route path="/billing" element={<BillingPage/>}></Route>
    
      </Routes>
     
      
        
    </BrowserRouter>

   
  );
}

export default App;
