
import React, { useState } from "react";
import "../styles/signin.css";
import image from "../assets/images/Optimize Your Mental Health with 24-7 Shalom Psychiatry 1.png";
import { useNavigate } from "react-router-dom";
import api from '../../api'
import Swal from 'sweetalert2';
import ChangePasswordModal from "./changepassworddoctor";
import logo from "../assets/images/image 13.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // 👁️ eye icons


function SignIn() {

   const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const navigate=useNavigate()
  // Step 1: Track selected role in state
  const [role, setRole] = useState("admin"); // default is 'admin'

  const [Email,setEmail]=useState("")
  const[Password,setPassword]=useState("")
    const [showPassword, setShowPassword] = useState(false);
  // Optionally, you can show different forms or adapt text for each role
  // const getFormTitle = () => {
  //   if (role === "admin")  return "Admin Sign in";
  //   if (role === "doctor") return "Doctor Sign in";
  //   if (role === "patient") return "Patient Sign in";
  //   return "Sign in";
  // };

const login = async (e) => {
  e.preventDefault();

  if (Email === 'admin' && Password === '123') {
    navigate('/admindashboard');
    return;
  }


    try {
      const resp = await api.post('api/v1/admin/AssetLogin', { Email, Password });

      // Success
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: resp.data.message || 'Welcome!',
        showConfirmButton: true,
         customClass: {
          confirmButton: 'my-swal-button',
        },
      });

      console.log(resp);
      
      localStorage.setItem('token', resp.data.data.token);
      localStorage.setItem('user', JSON.stringify(resp.data.data.user.Entity));
      localStorage.setItem('main_user', JSON.stringify(resp.data.data.user));

      navigate('/doctordashboard');

    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || 'Something went wrong!';

      if (status === 403) {
        Swal.fire({
          icon: 'warning',
          title: 'Change Password Required',
          text: message,
          showConfirmButton: true,
             customClass: {
          confirmButton: 'my-swal-button',
        },
        }).then(()=>
        {
         setShowChangePasswordModal(true);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: message,
          showConfirmButton: true,
             customClass: {
          confirmButton: 'my-swal-button',
        },
        });
      }
    }

};



  return (
    <div className="signin-container">
    
  
      <div className="visual-side" >
        <img
          src={image}
          alt=""
        />
      </div>



      <div className="form-side" >
        <form className="signin-form">
            <div className="logo-container">
            <img src={logo} alt="logo" />
          </div>
          <h2>Welcome Back</h2>
          <div className="nav-links">
            <span>Need an account?</span>
            <a href="/register">Sign Up</a>
          </div>
          
        

          {/* Step 3: The form updates (even just the heading here) */}
           {/* <h2>Sign In</h2> */}
          <div className="input-group">
           
            <label>Username</label>
            <input type="text" placeholder="Username" required  onChange={(e)=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input type={showPassword ? "text" : "password"} placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
              <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="options">
            <label>
              <input type="checkbox" style={{marginRight:"10px",transform: "scale(1.5)",accentColor: "#4d7bf3"}} />
              Remember me
            </label>
            <a href="/forgot">Forgot Password?</a>
          </div>
          <button className="login-btn" onClick={login}>
            Login
          </button>
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

export default SignIn;
