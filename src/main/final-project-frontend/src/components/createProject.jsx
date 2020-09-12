import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import authHeader from '../api/authHeader';
import authController from '../api/authController';
import TextField from '@material-ui/core/TextField';
import history from '../history';
import { Form, Field, List, Submit } from 'easy-react-form';

const CreateProject = (props) => {
    const API_URL = 'http://localhost:8188/api/v1/projects/';
    const user = authController.getCurrentUser();
    const [projectName, setProjectName] = useState('');
    const [tasks, setTasks] = useState([]);
    const users = [];
    const [isTasksCreated, setTrue] = useState(false);
    const switchToProjects = (e) => {
        e.preventDefault();
        history.push("/projects");
        window.location.reload();
    };

    const createNewProject = (e) => {
        e.preventDefault();
        if(!isTasksCreated) {
            console.log("Tasks weren't created!");
        }
        else {
            console.log(tasks);
            addTask(tasks);
            const newProject = {projectName: projectName, tasks: tasks};
            return axios.post(API_URL, newProject, 
                {headers: authHeader()})
                .then(res => { 
                    console.log(res.data);
            });
        }
    };

    const addTask = (tasks) => {
        setTrue(true);
        setTasks(tasks);
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
                <Form onSubmit={addTask}>
                    <h3>
                        The list of tasks:
                    </h3>
                    <List name="tasks">
                        {(tasks) => (
                        <React.Fragment>
                            {tasks.map((i) => (
                            <React.Fragment>
                                <div>
                                    <Field
                                    i={i}
                                    component="input"
                                    name="title"/>
                                </div>

                                <div>
                                    <Field
                                    i={i}
                                    component="input"
                                    name="description"/>
                                </div>

                                <div>
                                    <Field
                                    i={i}
                                    component="input"
                                    name="users"/>
                                </div>

                                <button onClick={() => tasks.remove(i)}>
                                Remove
                                </button>
                            </React.Fragment>
                            ))}
                            <button onClick={tasks.add}>
                            Add
                            </button>
                        </React.Fragment>
                        )}
                    </List>
                    <Submit component={ SubmitButton }>
                        Create all tasks
                    </Submit>
                </Form>
                </div>
                <div>
                    <Button onClick={createNewProject}>Create project</Button>
                </div>
        </div>
    );
}

function SubmitButton({ wait, children }) {
    return (
      <button disabled={ wait }>
        { children }
      </button>
    )
}

export default CreateProject;