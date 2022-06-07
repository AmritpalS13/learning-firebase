import React, { useState } from 'react'
import { auth } from '../firebase-config';
import RecipeReviewCard from './RecipeReviewCard';
function Home( {posts, likedPost} ) {
  
  return (
      //Testing to see if we can determine which user is logged in.
    <div>
       {
         posts.map((post) => {
          return (
            <RecipeReviewCard likedPost={likedPost} post={post}/>
            
          )
         })
       }
    </div>
  )
}

export default Home