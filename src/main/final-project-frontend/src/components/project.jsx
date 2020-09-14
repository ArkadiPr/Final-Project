import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import authHeader from '../api/authHeader';
import authController from '../api/authController';
import TextField from '@material-ui/core/TextField';
import history from '../history';
import trashImg from '../trash.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Project = () =>{
    const API_URL = 'http://localhost:8188/api/v1/projects/';
    const API_URL_TASK = 'http://localhost:8188/api/v1/tasks/';
    const [user, setUser] = useState(authController.getCurrentUser());
    const [project, setProject] = useState(null);
    const [canEdit, setValue] = useState(false);
    const projectId = localStorage.getItem('projectId');
    const [projectName, setName] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [message, setMessage] = useState('');
    const statusArray = [
        {value : 'IS_CREATED', label : 'Создана'},
        {value : 'IN_PROGRESS', label : 'В работе'},
        {value : 'ON_CHECK', label : 'Передана на проверку'},
        {value : 'ON_REWORK', label : 'Возвращена на доработку'},
        {value : 'IS_DONE', label : 'Завершена'},
        {value : 'IS_CANCELED', label : 'Отменена'}
    ];
    const priorityArray = [
        {value : 'IN_THE_PLAN', label : 'В планах'},
        {value : 'VERY_LOW', label : 'Очень низкий'},
        {value : 'LOW', label : 'Низкий'},
        {value : 'MIDDLE', label : 'Средний'},
        {value : 'HIGH', label : 'Высокий'},
        {value : 'VERY_HIGH', label : 'Очень высокий'}
    ];

    const headerStyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial",
        textAlign: "center"
    };

    useEffect(()=>{
        if(user===null) {
            history.push("/");
            window.location.reload();
        } 
        else {
            return axios.get(API_URL + projectId, 
                {headers: authHeader()})
                .then(res => {
                    setProject(res.data);
                    setName(res.data.projectName);
                    for(let j= 0; j < res.data.tasks.length; j++) {
                        for (let i = 0; i < statusArray.length; i++) {
                            if(statusArray[i].value === res.data.tasks[j].status) {
                                setStatus(statusArray[i].label);
                            }
                        }
                        for (let i = 0; i < priorityArray.length; i++) {
                            if(priorityArray[i].value === res.data.tasks[j].priority) {
                                setPriority(priorityArray[i].label);
                            }
                        }
                    }
            });
        }   
    },[2]);

    const switchToProjects = (e) => {
        e.preventDefault();
        history.push("/projects");
        window.location.reload();
    };

    const switchToTask = (e, id) => {
        e.preventDefault();
        localStorage.setItem('taskId', id);
        localStorage.setItem('owner', project.user.username);
        history.push("/task");
        window.location.reload();
    };

    const switchToCreateTask = (e) => {
        e.preventDefault();
        localStorage.setItem('owner', project.user.username);
        history.push("/create-task");
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

    const removeTask = (e, id) => {
        e.preventDefault();
        axios.delete(API_URL_TASK + id, 
            {headers: authHeader()})
            .then(res=>setMessage(res.data));          
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
                {project && canEdit === true && 
                    <TextField 
                        id="outlined-basic" 
                        label="Project name" 
                        value={projectName} 
                        onChange={e=>setName(e.target.value)} 
                        variant="outlined"></TextField>
                }
                <div>
                {project && project.user.username === user.username && canEdit===false 
                && <Button onClick={editProjectName}>Edit</Button>}
                {canEdit === true && <Button onClick={updateProjectName}>Ok</Button>}
                {canEdit === true && <Button onClick={editProjectName}>Cancel</Button>}
                </div>
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
                    <br></br>
            <div>
            <h5 style={headerStyle}>Tasks:</h5> 
                <ul>
                    {project && project.tasks.map(item => (
                        <div>
                        <li>
                            <Button onClick={e=>switchToTask(e, item.id)}>
                                <TextField id="filled-read-only-input" 
                                    label="title" 
                                    value={item.title}  
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"/>
                                <TextField id="filled-read-only-input" 
                                    label="priority" 
                                    value={priority}  
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                variant="filled"/>
                                <TextField id="filled-read-only-input" 
                                    label="status" 
                                    value={status}  
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"/>
                                 <TextField id="filled-read-only-input" 
                                    label="created date" 
                                    value={item.createdTime}  
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"/>    
                            </Button>
                            {project && project.user.username === user.username && <Button onClick={e => removeTask(e, item.id)}>
                                <img src={trashImg} alt="" 
                                    style={{width: 40,
                                    height: 40}}>
                                </img>
                            </Button>}
                        </li>
                       
                        </div>
                         
                        
                    ))}
                </ul>
                {project && project.user.username === user.username && <Button variant="outlined" onClick={switchToCreateTask}>Add new task</Button>}

                {message && (
                <div className="form-group">
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                </div>
                )}
            </div>
        </div>
    );
}
export default Project;