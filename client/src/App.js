import React, {useState, useEffect} from 'react';
import Header from './Components/Header';
import HeroImg from './Images/hero-img.jpg';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';


const App = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios.get(`${process.env.REACT_APP_API}/posts`)
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => alert('Något gick fel vid hämtning av inlägg'));
    }

    useEffect(() => {
        fetchPosts()
    }, [])
    return (
        <div>
            <Header />
            <div className="container p-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-4 mb-4">
                    <div className="col-12 col-lg-6">
                        <img src={HeroImg} width="607" height="510" className="hero-img d-block mx-lg-auto img-fluid" loading="lazy" alt="Ipsum" />
                    </div>
                    <div className="col-12 col-lg-6">
                    <h1 className="display-5 fw-bold mb-3">Träningsdagbok</h1>
                        <p className="lead">
                        Här dokumenterar vi vår resa från soffpotatis till maratonlöpare!
                        Vill du också vara med?
                        </p>

                        <div className="d-grid gap-2 d-md-flex justify-content-center p-3 pr-5">
                            <a href="/login" className="btn btn-primary btn-dark btn-lg px-4 me-md-2">Skapa konto</a>
                        </div>
                    </div>
            </div>

                <section className="latest pb-4 pt-4">
                <h2>Senaste träning</h2>
                <div className="row"> 
                    <div >     
                        {posts.map((post, i) => ( 
                                <div className="latest" key={post._id}>     
                                    <div className="card-content">
                                    <Link to={`/post/${post.slug}`}>
                                        <h3>{post.title}</h3>
                                    </Link>
                                        <p> Datum: {moment(new Date(post.date)).format('YYYY-MM-DD')}</p>
                                        <p>{post.content.substring(0, 55)}</p>
                                        <p>Användare: {post.user}</p>
                                    </div>
                                        <span className="badge badge-primary">Betyg: <br /><span className="grade">{post.grade}</span></span>
                                </div>         
                        ))}
                    </div>
                </div>
                </section>

               
            </div>
        </div>
    );
}

export default App;
