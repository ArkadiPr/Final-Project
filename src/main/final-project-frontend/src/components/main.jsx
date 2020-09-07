import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Projects from './projects';
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

    return (
        <div>
            <h3>Projects</h3>
            <div className="navbar">
                <Button onClick={switchToOwner}>Owner</Button>
                <Button onClick={switchToExecutor}>Executor</Button>
            </div>
            <div className="projectCards">
                <Projects role={isOwner}></Projects>
            </div>
        </div>
    );
}
export default MainPage;