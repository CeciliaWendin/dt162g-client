import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Components/Header';
import moment from 'moment';

const SinglePost = (props) => {
const [post, setPost] = useState('')

useEffect(() => {
   axios.get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
   .then(response => setPost(response.data))
   .catch(err => alert('Något gick fel'))
}, [])

return (
   <div>
      <Header />
      <div className="container p-5">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <div>
            <p className="lead">Datum: {moment(new Date(post.date)).format('YYYY-MM-DD')}  |  Betyg: {post.grade}  |  Användare: {post.user} </p>
            </div>
      </div>
   </div>
)
}

export default SinglePost;