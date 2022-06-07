import React, { useState } from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';


function Login( {setIsAuth} ){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let nav = useNavigate();
    const signInWithGoogle = () => {
       signInWithPopup(auth, provider).then((result) => {
           localStorage.setItem("isAuth", true);
           setIsAuth(true);
           nav('/');
       }) 
    }
    const signUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            setIsAuth(true);
            nav('/');
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <p>Sign in with Google to Continue</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>

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
        </div>
    );
}

export default Login;