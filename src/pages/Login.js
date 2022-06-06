import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Login( {setIsAuth} ){
    let nav = useNavigate();
    const signInWithGoogle = () => {
       signInWithPopup(auth, provider).then((result) => {
           localStorage.setItem("isAuth", true);
           setIsAuth(true);
           nav('/');
       }) 
    }
    return (
        <div>
            <p>Sign in with Google to Continue</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
}

export default Login;