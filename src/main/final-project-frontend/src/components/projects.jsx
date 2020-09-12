import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import authController from '../api/authController';
import history from '../history';
import axios from 'axios';
import authHeader from '../api/authHeader';
const Projects = (props) => {
    const API_URL = 'http://localhost:8188/api/v1/projects/';

    const user = authController.getCurrentUser();
    const [projects, setProjects] = useState([]);
    const [isOwner, setRole] = useState(true);
    const {setPage, setProjectId} = props


    useEffect(() => {
        if(user === null) {
          history.push("/");
          window.location.reload();
        } 
        else {
            if(isOwner === true) {
                return axios.get(API_URL + 'dtos/owners/'+ user.id, 
                {headers: authHeader()})
                .then(res => { 
                    console.log(res);
                    setProjects(res.data);
                });
            } else {  
                return axios.get(API_URL+ "dtos/executor/" + user.id, 
                {headers: authHeader()})
                .then(res => {
                    setProjects(res.data);
                });     
            }
        }
        console.log(user);
    },[]);

    const switchToOwner = (e) => {
        e.preventDefault();
        setRole(true);
    };

    const switchToExecutor = (e) => {
        e.preventDefault();
        setRole(false);
    };

    const switchToCreateProject = (e) => {
        e.preventDefault();
        setProjectId(-1);
        setPage(3);
    };

    const openProject = (e, id) => {
        e.preventDefault();
        setProjectId(id);
        setPage(2);
    };

    return (
        <div>
            <Button onClick={switchToOwner}>Owner</Button>
            <Button onClick={switchToExecutor}>Executor</Button>
            <Button onClick={switchToCreateProject}>Create project</Button>
            <ul>
                {projects.map(item => (
                    <li>
                        <Button onClick={e => openProject(e, item.id)}>{item.projectName}</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Projects;