import React, { useState } from 'react';
import './App.css';
import Login from './components/login';
import Button from '@material-ui/core/Button';
import Register from './components/register';
const App = (props) => {
  const [isLoginActive, setLoginActive] = useState(true);

  const switchToLogin = (e) => {
    e.preventDefault();
    setLoginActive(true);
  };

  const switchToRegister = (e) => {
    e.preventDefault();
    setLoginActive(false);
  };

  return (
    <div className="App">
      <div>
      <Button onClick={switchToLogin}>Login</Button>
      <Button onClick={switchToRegister}>Register</Button>
     </div>
     {isLoginActive && <Login/>}
     {!isLoginActive && <Register/>}
    </div>
  );
}
export default App;
