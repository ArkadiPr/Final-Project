import axios from 'axios';

const API_URL = 'http://localhost:8188/api/v1/auth/';

class authController {
   login(username, password) {
       return axios.post(API_URL + "signin", 
       {username, password})
       .then(response => {
         if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
      return response.data;
    });
   }

   register(username, password) { 
       return axios.post(API_URL + "signup", {username, password}) 
       .then(response => {
        if (response.data.token) {
           localStorage.setItem('user', JSON.stringify(response.data));
       }
       return response.data;
      });
   }

   logout() { 
     localStorage.removeItem("user");
   }

   getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new authController();