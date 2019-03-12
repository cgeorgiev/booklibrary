import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { withFirebase } from './Firebase';
import { AuthUserContext } from './Session';

const Navigation = ({ authUser }) => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <NavigationAuth /> : <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>
);

const NavigationAuthContent = ({ firebase }) => (
    <nav className="main-menu">
        <Link to="#" onClick={firebase.doSignOut}>Logout</Link>
    </nav>
);
const NavigationAuth = withFirebase(NavigationAuthContent);

const NavigationNonAuth = () => (
    <nav className="main-menu">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
    </nav>
);

const Header = () => {

    return (
        <header>
            <div className="site-logo">
                <Link to="/">Book Library</Link>
            </div>
            <Navigation />
        </header>
    )

}

export default Header;