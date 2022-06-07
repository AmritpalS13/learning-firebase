import React from 'react';

//User info
import { auth } from '../firebase-config';
import RecipeReviewCard from './RecipeReviewCard';


function MyAccount( { posts } ) {
  console.log(auth.currentUser.uid);
  return (
    <div>
      <h1>Posts History by User : </h1>
      {
        posts.map((post) => {
          if(post.author.id === auth.currentUser.uid) {
            return (
              <RecipeReviewCard post={post} />
            )
          }
        })
      }
    </div>
  )
}

export default MyAccount;