import axios from "axios";
const instance=axios.create({
   
          // baseURL:'http://localhost:5000/'
          // baseURL:"https://api.made4ever.in/"
          baseURL:'https://made4ever-admin-0kf8.onrender.com/'

       
})
export default instance;