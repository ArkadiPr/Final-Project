import Form from 'react-validation/build/form';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import authController from '../api/authController';
import history from "../history";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const required = (value) => {
        if (!value.toString().trim().length) {
          return 'require';
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        authController.login(username, password).then(() => {
            history.push("/projects");
            window.location.reload();
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              setMessage(resMessage);            
          });
    };

    return ( 
        <Form onSubmit={handleLogin}>
            <h3>Login</h3>
            <div>
                <InputLabel>
                    Username: 
                    <Input type='username' name='username' onChange={e=>setUsername(e.target.value)} validations={[required]}/>
                </InputLabel>
            </div>
            <div>
                <InputLabel>
                    Password:
                    <Input type='password' name='password' onChange={e=>setPassword(e.target.value)} validations={[required]}/>
                </InputLabel>
            </div>
            <div>
                <Button type="submit">Submit</Button>
            </div>
            {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
          )}
        </Form>
    );
}
export default Login;