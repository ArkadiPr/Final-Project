import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import authHeader from '../api/authHeader';
import authController from '../api/authController';
import TextField from '@material-ui/core/TextField';
import history from '../history';
import MenuItem from '@material-ui/core/MenuItem';

const Task = (props) => {
    const API_URL = 'http://localhost:8188/api/v1/tasks/';
    const user = authController.getCurrentUser();
    const taskId = localStorage.getItem('taskId');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [task, setTask] = useState(null);
    const [role, setRole] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const statusArray = [
        {value : 'IS_CREATE', label : 'Создана'},
        {value : 'IN_PROGRESS', label : 'В работе'},
        {value : 'ON_CHECK', label : 'Передана на проверку'},
        {value : 'ON_REWORK', label : 'Возвращена на доработку'},
        {value : 'IS_DONE', label : 'Завершена'},
        {value : 'IS_CANCELED', label : 'Отменена'}
    ];
    const priorityArray = [
        {value : 'IN_THE_PLANS', label : 'В планах'},
        {value : 'VERY_LOW', label : 'Очень низкий'},
        {value : 'LOW', label : 'Низкий'},
        {value : 'MIDDLE', label : 'Средний'},
        {value : 'HIGH', label : 'Высокий'},
        {value : 'VERY_HIGH', label : 'Очень высокий'}
    ];

    useEffect(()=>{
        return axios.get(API_URL + taskId, 
            {headers: authHeader()})
            .then(res => { 
                console.log(res);
                setTask(res.data);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setStatus(res.data.status);
                setPriority(res.data.priority);
                res.data.users.map(u => {
                    if(u.username === user.username){
                    setRole(true);
                }});
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

    const editData = (e) => {
        e.preventDefault();
        setCanEdit(!canEdit);
    };

    const updateTask = (e) => { 
        e.preventDefault();
        const updatedTask = {id: task.id, title: title, description: description, users: task.users,
        status: status, priority: priority};
        axios.put(API_URL,  updatedTask,
            {headers: authHeader()})
            .then(res => { 
                console.log(res);
                setTask(res.data);
                setTitle(res.data.title);
        });
        setCanEdit(!canEdit);
    };

    return (
        <div>
             <h3>Task</h3>
            <div className="navbar">
                <Button onClick={switchToProject}>Back to Project</Button>
                <Button onClick={switchToProjects}>Projects</Button>
            </div>

            <div>
                {task && canEdit === false &&
                <TextField id="filled-read-only-input" 
                    label="title" 
                    value={title}  
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"/>}

                {task && canEdit === true && 
                <TextField id="outlined-basic" 
                label="title" 
                value={title} 
                onChange={e=>setTitle(e.target.value)} 
                variant="outlined"/>}
            </div>

            <div>
                {task && canEdit === false &&
                <TextField id="filled-read-only-input" 
                    label="description" 
                    value={description}  
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"/>}

                {task && canEdit === true && 
                <TextField id="standard-multiline-flexible" 
                label="description" 
                value={description} 
                multiline
                rowsMax={4}
                onChange={e=>setDescription(e.target.value)} 
                variant="outlined"/>}
            </div>

            <div>
                {task && canEdit === false &&
                <TextField id="filled-read-only-input" 
                    label="status" 
                    value={status}  
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"/>}

                {task && canEdit === true && 
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
                  ))}</TextField>}
            </div>

            <div>
                {task && canEdit === false &&
                <TextField id="filled-read-only-input" 
                    label="priority" 
                    value={priority}  
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"/>}

                {task && canEdit === true && 
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
                 </TextField>}
            </div>
            
            <div>
                {task && canEdit===false && <Button onClick={editData}>Edit</Button>}
                {canEdit === true && <Button onClick={updateTask}>Ok</Button>}
                {canEdit === true && <Button onClick={editData}>Cancel</Button>}
            </div>
        </div>
    );
}
export default Task;