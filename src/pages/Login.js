import React, { useState } from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Login.css';

function Login( {setIsAuth} ){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    let nav = useNavigate();
    const signInWithGoogle = () => {
       signInWithPopup(auth, provider).then((result) => {
           localStorage.setItem("isAuth", true);
           setIsAuth(true);
           nav('/home');
       }) 
    }
    const signUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            setIsAuth(true);
            nav('/home');
        } catch (error) {
            console.log(error.message);
        }
    }
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            setIsAuth(true);
            nav('/home');
          } catch (error) {
            console.log(error.message);
          }
    }
    return (
        <div className='login-container'>
            <p>Sign in with Google to Continue</p>
            <Button  variant="contained" style={{backgroundColor: "red"}} onClick={signInWithGoogle}>Sign in with Google</Button>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Register/Sign up</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    <div className='emailSignUp'>
                <p>Sign up with email and password</p>
                <TextField 
                    id="outlined-basic" 
                    label="Email..."
                    variant='outlined' 
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Password..."
                    variant='outlined' 
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <Button variant="contained" onClick={ () => {signUp()}}>Sign Up</Button> 
            </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Existing User</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    <div className='user-login'>
            <p>Existing User? Sign in here:</p>
                <TextField 
                    id="outlined-basic" 
                    label="Email..."
                    variant='outlined' 
                    onChange={(e) => {setLoginEmail(e.target.value)}}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Password..."
                    variant='outlined' 
                    onChange={(e) => {setLoginPassword(e.target.value)}}
                />
                <Button variant="contained" onClick={ () => {login()}}>Login</Button>
            </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/* <div className='emailSignUp'>
                <p>Sign up with email and password</p>
                <TextField 
                    id="outlined-basic" 
                    label="Email..."
                    variant='outlined' 
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Password..."
                    variant='outlined' 
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <Button variant="contained" onClick={ () => {signUp()}}>Sign Up</Button> 
            </div>

            <div className='user-login'>
            <p>Existing User? Sign in here:</p>
                <TextField 
                    id="outlined-basic" 
                    label="Email..."
                    variant='outlined' 
                    onChange={(e) => {setLoginEmail(e.target.value)}}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Password..."
                    variant='outlined' 
                    onChange={(e) => {setLoginPassword(e.target.value)}}
                />
                <Button variant="contained" onClick={ () => {login()}}>Login</Button>
            </div> */}
        </div>
    );
}

export default Login;