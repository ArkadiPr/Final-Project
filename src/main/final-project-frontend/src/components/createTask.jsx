import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import authHeader from '../api/authHeader';
import authController from '../api/authController';
import TextField from '@material-ui/core/TextField';
import history from '../history';
import MenuItem from '@material-ui/core/MenuItem';

const CreateTask = () => {
    const API_URL = 'http://localhost:8188/api/v1/tasks/';
    const user = authController.getCurrentUser();
    const owner = localStorage.getItem('owner');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const projectId = localStorage.getItem('projectId');

    useEffect(()=>{ 
        if(user===null || user.username !== owner) {
            history.push("/");
            window.location.reload();
        }
    },[]);

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

    const createNewTask = (e) => {
        e.preventDefault();
        console.log(status);
        if (title.trim().length && description.trim().length) {
            if (status === '') {
                setStatus('IS_CREATED');
            }
            if (priority === '') {
                setPriority('IN_THE_PLAN');
            }
            const newTask = {
                title: title, 
                description: description, 
                status: status, 
                priority: priority,
                projectId: projectId
            };
            axios.post(API_URL, newTask, 
                {headers: authHeader()})
                .then(res => { 
                    console.log(res.data);
            });
            history.push("/project");
            window.location.reload(); 
        } 
    };

    return (
        <div>
            <h3>Create task</h3>
            <div className="navbar">
                <Button onClick={switchToProject}>Back to Project</Button>
                <Button onClick={switchToProjects}>Projects</Button>
            </div> 
            <div>
                <TextField id="outlined-basic" 
                    label="title" 
                    value={title} 
                    onChange={e=>setTitle(e.target.value)} 
                    variant="outlined"/> 
            </div>        
            <div>
                <TextField id="standard-multiline-flexible" 
                    label="description" 
                    value={description} 
                    multiline
                    rowsMax={4}
                    onChange={e=>setDescription(e.target.value)} 
                    variant="outlined"/>
            </div> 
            <div>
                <TextField
                 id="standard-select-currency"
                 select
                 label="status"
                 value={status}
                 onChange={e=>setStatus(e.target.value)}
                 helperText="Please select status"> {statusArray.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
            </div> 
            <div>
                <TextField
                    id="standard-select-currency"
                    select
                    label="priority"
                    value={priority}
                    onChange={e=>setPriority(e.target.value)}
                    helperText="Please select priority"> {priorityArray.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                ))}
                </TextField>
            </div>
            <div>
                <Button onClick={createNewTask}>Create task</Button>
            </div>
        </div>
    );
}
export default CreateTask;