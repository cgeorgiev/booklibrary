import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ErrorPage from "./ErrorPage";

import { withAuthentication } from './Session';

const App = () => (
    <Router>
        <div className="app">
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route component={ErrorPage} />
            </Switch>
            <Footer />
        </div>
    </Router>
)

export default withAuthentication(App);
