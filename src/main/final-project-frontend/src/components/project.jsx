import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import authHeader from '../api/authHeader';
import authController from '../api/authController';
import TextField from '@material-ui/core/TextField';
import history from '../history';
const Project = (props) =>{
    const API_URL = 'http://localhost:8188/api/v1/projects/';
    const [user, setUser] = useState(authController.getCurrentUser());
    const [project, setProject] = useState(null);
    const [canEdit, setValue] = useState(false);
    const projectId = localStorage.getItem('projectId');
    const [projectName, setName] = useState('');
    useEffect(()=>{
        console.log(user);
        return axios.get(API_URL + projectId, 
            {headers: authHeader()})
            .then(res => { 
                console.log(res);
                setProject(res.data);
                setName(res.data.projectName);
            });
    },[2]);

    const switchToProjects = (e) => {
        e.preventDefault();
        history.push("/projects");
        window.location.reload();
    };

    const switchToTask = (e, id) => {
        e.preventDefault();
        localStorage.setItem('taskId', id);
        history.push("/task");
        window.location.reload();
    };

    const editProjectName = (e) => {
        e.preventDefault();
        setValue(!canEdit);
    };

    const updateProjectName = (e) => {
        e.preventDefault();
        const updatedProject = {id: project.id, projectName: projectName, tasks: project.tasks, user: project.user};
        axios.put(API_URL,  updatedProject,
            {headers: authHeader()})
            .then(res => { 
                console.log(res);
                setProject(res.data);
                setName(res.data.projectName);
        });
        setValue(!canEdit);
    };

    return (
        <div>
            <h3>Project</h3>
            <div className="navbar">
                <Button onClick={switchToProjects}>Projects</Button>
            </div>
            <div>

                {project && canEdit === false &&
                <TextField id="filled-read-only-input" 
                    label="Project name" 
                    value={project.projectName}  
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"/>}
                {project && canEdit === true && <TextField id="outlined-basic" label="Project name" value={projectName} onChange={e=>setName(e.target.value)} variant="outlined"></TextField>}
                {project && project.user.username === user.username && canEdit===false && <Button onClick={editProjectName}>Edit</Button>}
                {canEdit === true && <Button onClick={updateProjectName}>Ok</Button>}
            </div>
            <div>
                {project && 
                <TextField id="filled-read-only-input" 
                    label="Owner" 
                    value={project.user.username}  
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"/>}
            </div>
            <div>
                <label>Tasks:</label> 
                <ul>
                    {project && project.tasks.map(item => (
                        <li>
                            <Button onClick={e=>switchToTask(e, item.id)}>{item.title} : {item.priority} : {item.status}</Button>
                        </li>
                    ))}
                </ul>
                <Button>Add new task</Button>
            </div>
        </div>
    );
}
export default Project;