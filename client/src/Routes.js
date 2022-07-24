import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Create from './Create';
import SinglePost from './SinglePost';
import AllPosts from './AllPosts';
import UpdatePost from './UpdatePost';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/create" exact component={Create} />
                <Route path="/post/:slug" exact component={SinglePost} />
                <Route path="/allposts" exact component={AllPosts} />
                <Route path="/post/update/:slug" exact component={UpdatePost} />
                <Route path="/login" exact component={Login} />
                <PrivateRoute path="/post/update/:slug" exact component={UpdatePost} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;