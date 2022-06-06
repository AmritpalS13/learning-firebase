import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function CreatePost( { isAuth }) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [ref, setRef] = useState("");
    const [cost, setCost] = useState(0);

    const postCollectionRef = collection(db, "posts");
    const nav = useNavigate();
    const createPost = async () => {
        await addDoc(postCollectionRef, {name, desc, ref, cost, author: {name: auth.currentUser.displayName, id: auth.currentUser.uid} });
        nav('/');
    }
    useEffect(() => {
        if(isAuth) {
            nav('/login');
        }
    }, []);
    return (
    <div className='create-post-page'>
        <div className='cp-container'>
            <h1>Create Entry</h1>
            <div className='inputcp'>
                <label>Name</label>
                <input placeholder='Name...' onChange={ (event) => {setName(event.target.value)}} />
            </div>
            <div className='inputcp'>
                <label>Description</label>
                <input placeholder='Description...' onChange={ (event) => {setDesc(event.target.value)}} />
            </div>
            <div className='inputcp'>
                <label>Ref</label>
                <input placeholder='Name...' onChange={ (event) => {setRef(event.target.value)}} />
            </div>
            <div className='inputcp'>
                <label>Cost</label>
                <input placeholder='Name...' onChange={ (event) => {setCost(event.target.value)}} />
            </div>
            <button onClick={createPost}>Submit Entry</button>
        </div>
    </div>
  )
}

export default CreatePost