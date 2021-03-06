import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MainPage from './components/main';
import Project from './components/project';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from './history';
import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";
import CreateProject from './components/createProject';
import Task from './components/task';
import CreateTask from './components/createTask';

const options = {
  position: positions.MIDDLE
};

ReactDOM.render(
  <Provider template={AlertMUITemplate} {...options}>
  <Router  history={history}>
  <Switch>
   <Route exact path="/" component={App} />
   <Route exact path="/projects" component={MainPage} />
   <Route exact path="/project" component={Project} /> 
   <Route exact path="/create-project" component={CreateProject} />
   <Route exact path="/task" component={Task} />
   <Route exact path="/create-task" component={CreateTask} />
 </Switch>
 </Router>
 </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
