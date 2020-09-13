import React from 'react';
import Projects from './projects';
const MainPage = (props) => {
    return (
        <div>
            <h3>Task Manager</h3> 
            <div>
                <Projects></Projects>
            </div> 
        </div>
    );
}
export default MainPage;