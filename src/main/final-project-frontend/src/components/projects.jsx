import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import authController from '../api/authController';
import history from '../history';
import axios from 'axios';
import authHeader from '../api/authHeader';
import trashImg from '../trash.png';
import { useAlert } from "react-alert";

const Projects = () => {
    const API_URL = 'http://localhost:8188/api/v1/projects/';
    const user = authController.getCurrentUser();
    const [ownerProjects, setOwnerProjects] = useState([]);
    const [executorProjects, setExecutorProjects] = useState([]);
    const [projectsType, setProjectsType] = useState(true);
    const alert = useAlert();

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        if(user === null) {
          history.push("/");
          window.location.reload();
        } 
        else {
            getOwnerProjects(source);
            getExecutorProjects(source);
        }    
    },[]);

    const getOwnerProjects = (source) => {
        return axios.get(API_URL + 'owners/', 
        {headers: authHeader(), cancelToken: source.token})
        .then(res => { 
            console.log(res);
            setOwnerProjects(res.data);
        });
    };

    const getExecutorProjects = (source) => {
        return axios.get(API_URL + 'executors/', 
                {headers: authHeader(), cancelToken: source.token})
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
        history.push("/create-project");
        window.location.reload();
    };

    const openProject = (e, id) => {
        e.preventDefault();
        localStorage.setItem('projectId', id);
        history.push("/project");
        window.location.reload();
    };

    const removeProject = (e, id) => {
        e.preventDefault();
        alert.show("Are you sure you want to delete this project?", {
            title: "Delete project",
            actions: [ 
              {
               copy: "Delete",
               onClick: () => {
                axios.delete(API_URL+id, {headers: authHeader()});
                history.push("/projects");
                window.location.reload();    
              }
            }
            ]});
        
    };

    const logout = (e) => {
        e.preventDefault();
        authController.logout();
        history.push("/");
        window.location.reload();
    };

    return (    
        <div>
            <Button onClick={switchToCreateProject}>Create project</Button>
            <Button onClick={logout}>Logout</Button>
        <div>
            <Button onClick={switchToOwner}>Owner</Button>
            <Button onClick={switchToExecutor}>Executor</Button>
        </div>
        <ul>
               { projectsType === true && ownerProjects.map(item => (
                    <li>
                        <Button onClick={e => openProject(e, item.id)}>{item.projectName}</Button>
                        <Button onClick={e => removeProject(e, item.id)}>
                            <img src={trashImg} alt="" 
                                style={{width: 25,
                                height: 25}}>
                            </img>
                        </Button>
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