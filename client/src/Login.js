import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Header from './Components/Header';
import { authenticate, getUser } from './helpers';

const Login = props => {
    // create a state
    const [state, setState] = useState({
        name: '',
        password: ''
    });
    const { name, password } = state; 

    useEffect(() => {
        getUser() && props.history.push('/');
    }, []);

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.table({ name, password });
        axios
            .post(`${process.env.REACT_APP_API}/login`, { name, password })
            .then(response => {
                console.log(response);
                // response will contain token and name
                authenticate(response, () => props.history.push('/create'));
                // redirect to create page
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <div className="container pb-5">
            <Header />
            <br />
            <h1>Logga in</h1>
            <p>För att skapa ett inlägg i din egen träningsdagbok - Logga in genom att ange ditt namn och lösenordet "Miun2022!"</p>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Namn</label>
                    <input
                        onChange={handleChange('name')}
                        value={name}
                        type="text"
                        className="form-control"
                        placeholder="Ditt namn"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Lösenord</label>
                    <input
                        onChange={handleChange('password')}
                        value={password}
                        type="password"
                        className="form-control"
                        placeholder="Miun2022!"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-primary">Logga in</button>
                </div>
            </form>
        </div>
    );
};

export default withRouter(Login);
