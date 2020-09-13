import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import authHeader from '../api/authHeader';
import TextField from '@material-ui/core/TextField';
import history from '../history';

const CreateProject = () => {
    const API_URL = 'http://localhost:8188/api/v1/projects/';
    const [projectName, setProjectName] = useState('');

    const switchToProjects = (e) => {
        e.preventDefault();
        history.push("/projects");
        window.location.reload();
    };

    const createNewProject = (e) => {
        e.preventDefault();
        if (projectName.trim().length) {
            const newProject = {projectName: projectName};
            axios.post(API_URL, newProject, 
                {headers: authHeader()})
                .then(res => { 
                    console.log(res.data);
            });
            history.push("/projects");
            window.location.reload(); 
        }   
    };
    
    return (
        <div>
            <h3>Create Project</h3>
            <div>
            <Button onClick={switchToProjects}>Projects</Button>
            </div>
                <label>Project name:</label>
                <div>
                    <TextField id="filled-basic" label="Filled" variant="filled" onChange={e=>setProjectName(e.target.value)} ></TextField>
                </div>
                <div>
                    <Button onClick={createNewProject}>Create project</Button>
                </div>
        </div>
    );
}

export default CreateProject;