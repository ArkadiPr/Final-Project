import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
const CreateProject = (props) => {
    const {setPage} = props

    const switchToProjects = (e) => {
        e.preventDefault();
        setPage(1);
    };

    const switchToProject = (e) => {
        e.preventDefault();
        setPage(2);
    };

    return (
        <div>
            <h3>Create Project</h3>
            <Button onClick={switchToProjects}>Projects</Button>
            <Button onClick={switchToProject}>Project</Button>
        </div>
    );
}
export default CreateProject;