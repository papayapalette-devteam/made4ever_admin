import axios from "axios";
const instance=axios.create({
   
          baseURL:'http://localhost:5000/'
          // baseURL:"https://made4ever-admin.onrender.com/"

       
})
export default instance;