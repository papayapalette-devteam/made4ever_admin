
import React, { useState } from "react";
import "../styles/register.css";
import image from "../assets/images/Optimize Your Mental Health with 24-7 Shalom Psychiatry 1.png";
import { useNavigate } from "react-router-dom";
import api from '../api'
import Swal from 'sweetalert2';
import ChangePasswordModal from "./changepassworddoctor";
import logo from "../assets/images/image 13.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // 👁️ eye icons


function RegisterPage() {

   const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const navigate=useNavigate()

    const [showPassword, setShowPassword] = useState(false);






  return (
    <div className="signup-container">
    
  
      <div className="visual-side" >
        <img
          src={image}
          alt=""
        />
      </div>



      <div className="form-side">
        <form className="signin-form">
            <div className="logo-container">
            <img src={logo} alt="logo" />
          </div>
          <h2>Sign Up</h2>
          <div className="nav-links">
            <span>Enter details to create your account?</span>
          </div>
          
        

          {/* Step 3: The form updates (even just the heading here) */}
           {/* <h2>Sign In</h2> */}
          <div className="input-group" >
           
            <label>Username</label>
            <input type="text" placeholder="Username" required  />
            <label>Email Id</label>
            <input type="text" placeholder="Email Id" required  />
            <label>Password</label>
            <input type={showPassword ? "text" : "password"} placeholder="Password" required/>
            <label>Confirm Password</label>
            <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" required/>
              <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
          <button className="login-btn">
            Register
          </button>

            <div className="nav-links" style={{textAlign:"center"}}>
            <span>Already Registered?</span>
            <a href="/signin" style={{marginLeft:"30px"}}>Log In</a>
          </div>
          
{
  showChangePasswordModal ? <ChangePasswordModal/> :""
}
        

          {/* <div className="or-divider">OR</div>
          <div className="social-row">
            <button type="button" className="g">
              G
            </button>
            <button type="button" className="f">
              F
            </button>
            <button type="button" className="x">
              X
            </button>
            <button type="button" className="in">
              in
            </button>
          </div> */}
        </form>
   
      </div>
      
    </div>
  );
}

export default RegisterPage;










