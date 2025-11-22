
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api'
import Swal from 'sweetalert2';
import './signin.css'
// import ChangePasswordModal from "./changepassworddoctor";
import logo from "../Admin/images/Made4Ever New Logo (600 x 300 px) (1).png";
import image from "../Admin/images/M4E_Admin Login.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // 👁️ eye icons


function SignIn() {

  

  const navigate=useNavigate()

  const [Email,setEmail]=useState("")
  const[Password,setPassword]=useState("")
  const [showPassword, setShowPassword] = useState(false);


const login = async (e) => {
  e.preventDefault();


    try {
     

    if(Email==="admin@made4ever.in" && Password==="admin@123")
    {

        Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text:  'Welcome Admin !',
        showConfirmButton: true,
         customClass: {
          confirmButton: 'my-swal-button',
        },
      });

      localStorage.setItem('token',"Admin");

      navigate('/admin-dashboard');

    }
    else
    {
       const resp = await api.post('api/msp/signin/sub-admin-sign-in', { Email, Password });

      if(resp.status===200)
      {
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

      localStorage.setItem('token',resp.data.token);
      localStorage.setItem('user', JSON.stringify(resp.data.user));


      navigate('/admin-dashboard');

    }

    }
   

    } catch (error) {

      // const message = error.response?.data?.message || 'Something went wrong!';

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: "Please Check Id And Password",
          showConfirmButton: true,
             customClass: {
          confirmButton: 'my-swal-button',
        },
        });
      }
    }





  return (
    <div className="signin-container">
    
  
      <div className="visual-side" >
        <img
          src={image}
          alt=""
          style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"12px"}}
        />
      </div>



      <div className="form-side" >
        <form className="signin-form">
            <div className="logo-container">
            <img src={logo} alt="logo" />
          </div>
          <h2>Welcome Back</h2>
    
          
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
{/* {
  showChangePasswordModal ? <ChangePasswordModal/> :""
} */}
        

       
        </form>

      </div>
    </div>
  );
}

export default SignIn;
