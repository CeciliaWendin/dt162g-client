import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Components/Header';
import {getToken} from './helpers';

const UpdatePost = props => {
    const [state, setState] = useState({
        title: '',
        content: '',
        slug: '',
        date: '',
        grade: ''
    });
    const { title, content, slug, date, grade } = state;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(response => {
                const { title, content, slug, date, grade } = response.data;
                setState({ ...state, title, content, slug, date, grade });
            })
            .catch(error => alert('Inlägget kunde inte laddas'));
    }, []);

    // onchange event handler
    const handleChange = name => event => {
        
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        
        axios
            .put(`${process.env.REACT_APP_API}/post/${slug}`, { title, content, date, grade }, {
                headers: {
                   authorization: `Bearer ${getToken()}`
                }
             })
            .then(response => {
                console.log(response);
                const { title, content, slug, date, grade } = response.data;
                // empty state
                setState({ ...state, title, content, slug, date, grade });
                // show sucess alert
                alert(`Inlägget uppdaterades`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={handleChange('title')}
                    value={title}
                    type="text"
                    className="form-control"
                    placeholder="Post title"
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Content</label>
                <textarea
                    onChange={handleChange('content')}
                    value={content}
                    type="text"
                    className="form-control"
                    placeholder="Write something.."
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Datum</label>
                <input
                   onChange={handleChange('date')}
                   value={date}
                   type="date"
                   className="form-control"
                   placeholder="Datum"
                   required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Betyg</label>
                <input
                   onChange={handleChange('grade')}
                   value={grade}
                   type="number"
                   className="form-control"
                   placeholder="Betyg"
                   required
                />
            </div>
            <div>
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    );

    return (
        <div className="container pb-5">
            <Header />
            <br />
            <h1>Uppdatera inlägg</h1>
            {showUpdateForm()}
        </div>
    );
};

export default UpdatePost;
