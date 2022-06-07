import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
//Importing the entire Database,
import { db } from './firebase-config';//This contains all the raw data.

import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import MyAccount from './pages/MyAccount';

import { Toolbar, AppBar, Button } from '@mui/material';

import ResponsiveAppBar from './pages/ResponsiveAppBar';
import RecipeReviewCard from './pages/RecipeReviewCard';
import './App.css';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [posts, setPosts] = useState([]);
  
  //If there is no user logged into the system.
  if(isAuth === null) {
    setIsAuth(false);
  }

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false)
      window.location.pathname = '/login';
    })
  }
  const postCollectionRef = collection(db, "posts");

  //Using the post ID
  const likedPost = (id) => {
    console.log("Post clicked id : ", id);
  } 
  useEffect(() => {
    const getPostData = async () => {
      const data = await getDocs(postCollectionRef);
      const cleanData = data.docs
      cleanData.map( (data) => console.log(data.id));
      setPosts(data.docs.map( (doc) => ({...doc.data(), id: doc.id})));
    }
    getPostData();
    
  }, [])
  
  return (
    <Router>
      <ResponsiveAppBar isAuth={isAuth} signUserOut={signUserOut}/>
      <Routes>
        <Route path="/home" element={ <Home likedPost={likedPost} posts={posts} />} />
        <Route path="createpost" element={<CreatePost />} />
        <Route path="login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="my-account" element={<MyAccount posts={posts}/>} />
      </Routes>
    </Router>
  );
}

export default App;
