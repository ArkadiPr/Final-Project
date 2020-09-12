import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import authHeader from '../api/authHeader';
import authController from '../api/authController';
import TextField from '@material-ui/core/TextField';

const CreateProject = (props) => {
    const API_URL = 'http://localhost:8188/api/v1/projects/';
    const user = authController.getCurrentUser();
    const {setPage, setProjectId} = props;
    const {projectName, setProjectName} = useState('');

    useEffect(()=>{
        console.log(user);
    },[]);

    const switchToProjects = (e) => {
        e.preventDefault();
        setPage(1);
    };

    const openNewProject = (e) => {
        e.preventDefault();
        //TODO: разобраться с тем, что отправлять при запросе "создать проект"
        const newProject = {id: null, projectName: projectName, user: user, tasks: null};
        return axios.post(API_URL, newProject, 
            {headers: authHeader()})
            .then(res => { 
                setProjectId(res.id);
                setPage(2);
        });
    };

    return (
        <div>
            <h3>Create Project</h3>
            <Button onClick={switchToProjects}>Projects</Button>
            <form onSubmit={openNewProject}>
                <label>Project name:</label>
                <div>
                    <TextField id="filled-basic" label="Filled" variant="filled" onChange={e=>setProjectName(e.target.value)} />
                </div>
                <div>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </div>
    );
}
export default CreateProject;