import axios from "axios";
const instance=axios.create({
   
          // baseURL:'http://localhost:5000/'
          baseURL:"https://api.made4ever.in/"

       
})
export default instance;