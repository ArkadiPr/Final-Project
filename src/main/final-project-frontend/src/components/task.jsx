import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import authHeader from '../api/authHeader';
import authController from '../api/authController';
import TextField from '@material-ui/core/TextField';
import history from '../history';
const Task = (props) => {
    const API_URL = 'http://localhost:8188/api/v1/tasks/';
    const user = authController.getCurrentUser();
    const taskId = localStorage.getItem('taskId');
    const [title, setTitle] = useState('');
    const [task, setTask] = useState(null);
    
    useEffect(()=>{
        console.log(user);
        return axios.get(API_URL + taskId, 
            {headers: authHeader()})
            .then(res => { 
                console.log(res);
                setTask(res.data);
                setTitle(res.data.title);
            });
    },[2]);

    const switchToProjects = (e) => {
        e.preventDefault();
        history.push("/projects");
        window.location.reload();
    };

    const switchToProject = (e) => {
        e.preventDefault();
        history.push("/project");
        window.location.reload();
    };

    return (
        <div>
             <h3>Task</h3>
            <div className="navbar">
                <Button onClick={switchToProject}>Back to Project</Button>
                <Button onClick={switchToProjects}>Projects</Button>
            </div>
        </div>
    );
}
export default Task;