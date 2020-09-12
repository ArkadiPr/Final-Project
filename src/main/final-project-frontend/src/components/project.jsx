import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import authHeader from '../api/authHeader';
import TextField from '@material-ui/core/TextField';
const Project = (props) =>{
    const API_URL = 'http://localhost:8188/api/v1/projects/';
    const {setPage, projectId} = props;
    const [project, setProject] = useState(null);

    useEffect(()=>{
        return axios.get(API_URL + projectId, 
            {headers: authHeader()})
            .then(res => { 
                console.log(res);
                setProject(res.data);
            });
    },[]);

    const switchToProjects = (e) => {
        e.preventDefault();
        setPage(1);
    };

    return (
        <div>
            <h3>Project</h3>
            <div className="navbar">
                <Button onClick={switchToProjects}>Projects</Button>
            </div>
            <div>
                <label>Project name: </label>
                <TextField id="outlined-basic" label="Outlined" variant="outlined">{project.projectName}</TextField>
                <Button>Edit</Button>
            </div>
            <div>
                <label>Owner: </label>
                <TextField id="outlined-basic" label="Outlined" variant="outlined">{project.user.username}</TextField>
            </div>
            <div>
                <label>Tasks: </label> 
                <ul>
                    {/* {project.tasks.map(item => (
                        <li>
                            <Button onClick={e => openTask(e, item.id)}>{item.title} : {item.priority} : {item.status}</Button>
                        </li>
                    ))} */}
                </ul>
                <Button>Add new task</Button>
            </div>
        </div>
    );
}
export default Project;