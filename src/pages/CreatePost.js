import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';


function CreatePost( { isAuth }) {
    const [name, setName] = useState("");

    const postCollectionRef = collection(db, "posts");
    const nav = useNavigate();
    const createPost = async () => {
        await addDoc(postCollectionRef, {name, author: {name: auth.currentUser.displayName, id: auth.currentUser.uid} });
        nav('/');
    }
    useEffect(() => {
        if(isAuth) {
            nav('/login');
        }
    }, []);
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete='off'
        >
        <div>
            <TextField 
                onChange={(e) => {setName(e.target.value)}}
                required
                id="outline-required"
                label="Required"
                defaultValue="Name..."
            />
        </div>
        <Button onClick={() => {createPost()}} variant='contained'>Submit Post</Button>
        </Box>
    
    )
}

export default CreatePost