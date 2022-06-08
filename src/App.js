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
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { FiberPinRounded } from '@material-ui/icons';

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  

  //Figure out a way to sync the likedposts data with the user
  const testAdd = async () => {
    //The following code will create a collection that is associated to the user ID, which is unique for every user.
    await setDoc(doc(db, "likedposts", auth.currentUser.uid), {
      likes: [],
    });
  }
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
  const likedPostCollectionRef = collection(db, "likedposts");
  //Using the post ID
  const likedPost = (id) => {
    console.log("Post clicked id : ", id);
    //Add this id to the likedpost, and to the associated account (UID)
    if(isAuth) {
      console.log("Liked by : ", auth.currentUser.email);
      console.log("User ID  : ", auth.currentUser.uid);
    }
  } 
  const testingLike = () => {
    console.log(auth.currentUser);
    
  }
  useEffect(() => {
    const getPostData = async () => {
      const data = await getDocs(postCollectionRef);
      
      setPosts(data.docs.map( (doc) => ({...doc.data(), id: doc.id})));
    }
    const getLikesData = async () => {
      const likeData = await getDocs(likedPostCollectionRef);
      var test = likeData.docs.map( (doc) => ({...doc.data(), id: doc.id}));
      //console.log(test);
      setLikes(test);
      console.log(likes);
      //setLikes(likeData.docs.map ((doc) => ({...doc.data(), id: doc.id})));
      
    }
    getPostData();
    getLikesData();
    
  }, [])
  
  return (
    <Router>
      <ResponsiveAppBar isAuth={isAuth} signUserOut={signUserOut}/>
      <button onClick={()=>{testingLike()}}>Test</button>
      <button onClick={()=>{testAdd()}}>Test col add</button>
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
