import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

const Project = (props) =>{
    const {setPage, projectId} = props;
    
    const switchToCreateProject = (e) => {
        e.preventDefault();
        setPage(3);
    };

    const switchToProjects = (e) => {
        e.preventDefault();
        setPage(1);
    };

    return (
        <div>
            <h3>Project</h3>
            <Button onClick={switchToCreateProject}>CreateProject</Button>
            <Button onClick={switchToProjects}>Projects</Button>
        </div>
    );
}
export default Project;