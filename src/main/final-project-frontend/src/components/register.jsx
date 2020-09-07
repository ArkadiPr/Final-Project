import Form from 'react-validation/build/form';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import authController from '../api/authController';
import history from "../history";
const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeat] = useState('');
    const [message, setMessage] = useState('');

    const required = value => {
        if (!value) {
          return (
            <div className="alert alert-danger" role="alert">
              This field is required!
            </div>
          );
        }
    };

    const checkUser = value => {
        if(value.length < 3 || value.length > 30) {
         return (
           <div className="alert alert-danger" role="alert">
                Username must be between 3 and 30 characters.
           </div>
         );
        }
     }
     
     const checkPassword = value => {
       if(value.length < 6 || value.length > 30) {
         return (
           <div className="alert alert-danger" role="alert">
                Password must be between 6 and 30 characters.
           </div>
         );
       }
       var upper = /[A-Z]/;
       var lower = /[a-z]/;
       var nums = /[0-9]/;
       if(!value.match(upper)||!value.match(lower)||!value.match(nums)) {
         return (
           <div className="alert alert-danger" role="alert">
                Password must have numbers, uppercase letters and lowercase letters.
           </div>
         );
       }
     }

    const matchPassword = value => {
        if (password !== repeatPassword) {
            setMessage("Password and repeat don't match!");
        } else {
            setMessage('');
        }
    }; 

    const handleRegister = (e) => {
        e.preventDefault();  
        console.log(username + ' ' + password);
        authController.register(username, password);
        history.push('/projects');
        window.location.reload();
    };

    return ( 
        <Form className="form" onSubmit={handleRegister}  
        >
            <h3>Register</h3>
            <div>
                <InputLabel>
                    Username: 
                    <Input type='username' name='username' value={username} onChange={e=>setUsername(e.target.value)} validations={[required, checkUser]}/>
                </InputLabel>
            </div>
            <div>
                <InputLabel>
                    Password:
                    <Input type='password' name='password' value={password} onChange={e=>setPassword(e.target.value)} validations={[required, checkPassword, matchPassword]}/>
                </InputLabel>
            </div>
            <div>
                <InputLabel>
                    Repeat password:
                    <Input type='password' name='repeat-password' value={repeatPassword} onChange={e=>setRepeat(e.target.value)} validations={[required, matchPassword]}/>
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
export default Register;