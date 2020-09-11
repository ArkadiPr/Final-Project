import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Projects from './projects';
import Project from './project';
import CreateProject from './createProject';
import authController from '../api/authController';
import history from '../history';
const MainPage = (props) => {
    const [page, setPage] = useState(1);
    const [projectId, setProjectId] = useState(-1);

    const logout = (e) => {
        e.preventDefault();
        authController.logout();
        history.push("/");
        window.location.reload();
    };
    
    return (
        <div>
            <h3>Task Manager</h3>
            <div className="navbar">
                <Button onClick={logout}>Logout</Button>
            </div>
            <div>
                {page===1 && <Projects setPage={setPage} setProjectId={setProjectId}></Projects>}
                {page===2 && <Project setPage={setPage} projectId={projectId}></Project>}
                {page===3 && <CreateProject setPage={setPage} setProjectId={setProjectId}></CreateProject>}
            </div>
        
        </div>
    );
}
export default MainPage;