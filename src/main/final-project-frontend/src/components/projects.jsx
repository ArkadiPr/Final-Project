import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import projectController from '../api/projectController';
import authController from '../api/authController';
import history from '../history';
const Projects = (props) => {
    const [user, setUser] = useState(authController.getCurrentUser());
    const [projects, setProjects] = useState([]);
    const role = props;
    useEffect(() => {
        if(user===null) {
          history.push("/");
          window.location.reload();
        } 
        else {
            if(role==true) {
                setProjects(projectController.getOwnerProjects(user.id));
            } else {
                setProjects(projectController.getExecutorProjects(user.id));
            }
        }
        console.log(user);
    },[]);

    const openProject = (projectId) => () => {
        
    };

    return (
        <div>
            <ul>
                {projects.map(item => (
                      <li>
                        <Button onClick={openProject(item.id)}>{item.name}</Button>
                      </li>
                ))}
            </ul>
        </div>
    );
}
export default Projects;