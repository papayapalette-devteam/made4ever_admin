import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";


import Dashboard from "./components/Bureau/Dashboard";
import ProfilesPage from "./components/Bureau/Profiles/profile";
import NewProfileForm from "./components/Bureau/Profiles/add_new_profile";




function App() {
  return (
   
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Dashboard/>}></Route>
         <Route path="/profiles" element={<ProfilesPage/>}></Route>
         <Route path="/add-new-profile" element={<NewProfileForm/>}></Route>
    
      </Routes>
     
      
        
    </BrowserRouter>

   
  );
}

export default App;
