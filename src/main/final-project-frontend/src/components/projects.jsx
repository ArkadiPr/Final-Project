import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import authController from '../api/authController';
import history from '../history';
import axios from 'axios';
import authHeader from '../api/authHeader';

const Projects = (props) => {
    const API_URL = 'http://localhost:8188/api/v1/projects/';
    const user = authController.getCurrentUser();
    const [ownerProjects, setOwnerProjects] = useState([]);
    const [executorProjects, setExecutorProjects] = useState([]);
    const [projectsType, setProjectsType] = useState(true);
    const {setPage, setProjectId} = props

    useEffect(() => {
        if(user === null) {
          history.push("/");
          window.location.reload();
        } 
        else {
            getOwnerProjects();
            getExecutorProjects();
        }    
    },[]);

    const getOwnerProjects = () => {
        return axios.get(API_URL + 'owners/', 
        {headers: authHeader()})
        .then(res => { 
            console.log(res);
            setOwnerProjects(res.data);
        });
    };

    const getExecutorProjects = () => {
        return axios.get(API_URL+ 'executors/', 
                {headers: authHeader()})
                .then(res => {
                    setExecutorProjects(res.data);
                });     
    };

    const switchToOwner = (e) => {
        e.preventDefault();
        setProjectsType(true);
    };

    const switchToExecutor = (e) => {
        e.preventDefault();
        setProjectsType(false);
    };

    const switchToCreateProject = (e) => {
        e.preventDefault();
        history.push("/create");
        window.location.reload();
    };

    const openProject = (e, id) => {
        e.preventDefault();
        setProjectId(id);
        setPage(2);
    };


    return (    
        <div>
            <Button onClick={switchToCreateProject}>Create project</Button>
        <div>
            <Button onClick={switchToOwner}>Owner</Button>
            <Button onClick={switchToExecutor}>Executor</Button>
        </div>
        <ul>
               { projectsType === true && ownerProjects.map(item => (
                    <li>
                        <Button onClick={e => openProject(e, item.id)}>{item.projectName}</Button>
                    </li>
                )) }
                { projectsType === false && executorProjects.map(item => (
                    <li>
                        <Button onClick={e => openProject(e, item.id)}>{item.projectName}</Button>
                    </li>
                )) }
        </ul>
        </div>
    );
}
export default Projects;