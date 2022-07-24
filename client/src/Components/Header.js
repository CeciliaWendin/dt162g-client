import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { getUser, logout } from './../helpers';

const Header = ({history}) => (
   <header>
      <nav>
         <ul className="container nav nav-tabs align-items-center">
         <li className="logo nav-item pr-3 pt-3 pb-3 pr-5">
               <Link to="/">Work it</Link>
            </li>
            <li className="nav-item pr-3 pt-3 pb-3">
               <Link to="/">Hem</Link>
            </li>
            <li className="nav-item pr-3 pt-3 pb-3">
               <Link to="/allposts">Inlägg</Link>
            </li>
           
            {getUser() && ( <li className="nav-item pr-3 pt-5 pb-5">
                <Link to="/create">Skapa inlägg</Link>
            </li>)}

            {!getUser() && (
                <li className="nav-item ml-auto pr-3 pt-5 pb-5">
                    <Link to="/login">Logga in</Link>
                </li>
            )}

            {getUser() && (
                <li
                    onClick={() => logout(() => history.push('/'))}
                    className="nav-item ml-auto pr-3 pt-5 pb-5"
                    style={{ cursor: 'pointer' }}
                >
                    Logga ut
                </li>
            )}
         </ul>
      </nav>
   </header>
)

export default withRouter(Header);