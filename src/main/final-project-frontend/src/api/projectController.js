import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8188/api/v1/projects/';

class projectController {  
    getOwnerProjects(id) {
        return axios.get(API_URL+"owner/" + id, 
        {headers: authHeader()})
        .then(res => {return res.data});
    }
    
    getExecutorProjects(id) {
        return axios.get(API_URL+"executor/" + id, 
        {headers: authHeader()})
        .then(res => {return res.data});
    }
}
export default new projectController();