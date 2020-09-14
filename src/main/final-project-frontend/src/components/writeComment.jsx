
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import authHeader from '../api/authHeader';
import authController from '../api/authController';
import TextField from '@material-ui/core/TextField';
import history from '../history';

const WriteComment = (props) => {
    const API_URL = 'http://localhost:8188/api/v1/comments/';
    const [text, setText] = useState('');
    const [toUser, setToUser] = useState('');
    const {task} = props;
    const user = authController.getCurrentUser();

    const sendComment = (e) => {
        e.preventDefault();
        const newComment = {fromUser : user.username, task : task, toUser : toUser, text : text};
        axios.post(API_URL, newComment,
            {headers: authHeader()})
            .then(res => { 
                console.log(res);
                history.push("/task");
                window.location.reload();
        });    
    };

    return (
        <div>
            <div>
                <TextField id="outlined-basic" 
                    label="to User" 
                    value={toUser} 
                    onChange={e=>setToUser(e.target.value)} 
                    variant="outlined"
                />
            </div>

            <div>
                <TextField
                    id="filled-multiline-static"
                    label="write comment"
                    multiline
                    rows={4}
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    variant="filled"
                />
            </div>

            <div>
                <Button variant="outlined" color="primary" onClick={sendComment}>Send</Button>
            </div>
        </div>
    );
}
export default WriteComment;