import React from 'react';

import { AuthUserContext } from './Session';

const Home = ({ authUser }) => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <HomeContent authUser={authUser} /> : <HomeNotLogged />
        }
    </AuthUserContext.Consumer>
);

const HomeContent = (props) => {
    //console.log(props.authUser)
    return (
        <h1>Home logged {props.authUser.role}</h1>
    )
}

const HomeNotLogged = () => (
    <h1>Home NOT logged</h1>
);

export default Home;