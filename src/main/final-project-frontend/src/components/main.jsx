import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Projects from './projects';
import authController from '../api/authController';
import history from '../history';
const MainPage = (props) => {
    const [isOwner, setRole] = useState(true);

    const switchToOwner = (e) => {
        e.preventDefault();
        setRole(true);
    };

      const switchToExecutor = (e) => {
        e.preventDefault();
        setRole(false);
    };

    const logout = (e) => {
        e.preventDefault();
        authController.logout();
        history.push("/");
        window.location.reload();
    };
    return (
        <div>
            <h3>Projects</h3>
            <div className="navbar">
                <Button onClick={switchToOwner}>Owner</Button>
                <Button onClick={switchToExecutor}>Executor</Button>
                <Button onClick={logout}>Logout</Button>
            </div>
            <div className="projectCards">
                <Projects role={isOwner}></Projects>
            </div>
        </div>
    );
}
export default MainPage;