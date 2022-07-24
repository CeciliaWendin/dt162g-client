import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getUser, getToken } from './helpers';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios
            .get(`${process.env.REACT_APP_API}/posts`)
            .then(response => {
                // console.log(response);
                setPosts(response.data);
            })
            .catch(error => alert('Error fetching posts'));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Delete post
    const deleteConfirm = slug => {
      let answer = window.confirm('Är du säker på att du vill radera inlägget?');
      if (answer) {
          deletePost(slug);
      }
  };

  const deletePost = slug => {
      
      axios
          .delete(`${process.env.REACT_APP_API}/post/${slug}`, {
            headers: {
               authorization: `Bearer ${getToken()}`
            }
         })
          .then(response => {
              alert(response.data.message);
              fetchPosts();
          })
          .catch(error => alert('Inlägget kunde inte raderas'));
  };

    return (
        <div className="container pb-5">
            <Header />
            <br />
            <h1>Träningsinlägg</h1>
            <hr />
            {posts.map((post, i) => (
                <div className="row latest" key={post._id}>
                    <div className="col pt-3 pb-2">
                        <div className="row">
                        <span className="badge badge-primary">Betyg: <br /><span class="grade">{post.grade}</span></span> 
                            <div className="content col-md-10">
                                <Link to={`/post/${post.slug}`}>
                                    <h2>{post.title}</h2>
                                </Link>
                                <p> Datum: {moment(new Date(post.date)).format('YYYY-MM-DD')}</p>
                                <p className="lead">{post.content.substring(0, 100)}</p>   
                                <p className="lead">Användare: {post.user}</p>                        
                            </div>

                            {getUser() && (
                            <div className="col-md-2">
                                <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-outline-warning">
                                Redigera
                                </Link>
                                <button onClick={() => deleteConfirm(post.slug)} 
                                className="btn btn-sm btn-outline-danger ml-1">Radera</button>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllPosts;
