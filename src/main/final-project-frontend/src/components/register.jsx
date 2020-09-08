
import React, {useState} from 'react';
import authController from '../api/authController';
import history from "../history";
import { Formik, Form, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = (props) => {
    const [message, setMessage] = useState('');

    const validateUsername = value => {
        if(value.length < 3 || value.length > 30) {
         return 'Username must be between 3 and 30 characters.';
        }
     }
     
    const validatePassword = value => {
       if(value.length < 6 || value.length > 30) {
         return 'Password must be between 6 and 30 characters.';
       }
       var upper = /[A-Z]/;
       var lower = /[a-z]/;
       var nums = /[0-9]/;
       if(!value.match(upper)||!value.match(lower)||!value.match(nums)) {
         return 'Password must have numbers, uppercase letters and lowercase letters.';
       }
     }

    const validateConfirmPassword = (pass, value) => {
      let error = "";
      if (pass !== value) {
        error = "Password not matched";
      }
      return error;
    };

    return ( 
      <Formik
      initialValues = {{
        username: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={values => {
        authController.register(values.username, values.password)
        .then(() => {
          history.push("/project");
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
      }}
    >
      {({ errors, touched, values }) => (
        <Form>
          <h3>Register</h3>
          <div>
          <label>Username:</label>
          <Field name="username" validate={validateUsername} />
          {errors.username && touched.username && <div>{errors.username}</div>}
          </div>

          <div>
          <label>Password:</label>
          <Field name="password" type="password" validate={validatePassword} />
          {errors.password && touched.password && <div>{errors.password}</div>}
          </div>

          <div>
          <label>Confirm password:</label>
          <Field name="confirmPassword" type="password" validate={value=>validateConfirmPassword(values.password, value)} />
          {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
          </div>

          <button className="btn" type="submit">Submit</button>
          {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
          )}
        </Form>
      )}
    </Formik>
    );
}
export default Register;