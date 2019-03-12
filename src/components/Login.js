import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withFirebase } from "./Firebase";
import { AuthUserContext } from './Session';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const Login = ({ authUser, ...props }) => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <Redirect to='/' /> : <LoginForm {...props} />
        }
    </AuthUserContext.Consumer>
);

class LoginForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = { ...INITIAL_STATE };

		//this.handleChange = this.handleChange.bind(this);
    }

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		
		const { email, password } = this.state;

        this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({ error });
        });
            
	};

	render() {
		const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

		return (
			<div className="page">
				<h1>Login</h1>
				{error && <p>{error.message}</p>}
				<form onSubmit={this.handleSubmit}>
					<div className="form-field">
						<label htmlFor="email">Email Address</label>
						<input
							type="email"
                            id="email"
                            value={email}
							placeholder="Email Address"
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className="form-field">
						<label htmlFor="password">Password</label>
						<input
							type="password"
                            id="password"
                            value={password}
							placeholder="Password"
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className="form-field">
						<button disabled={isInvalid} type="submit">
							Login
						</button>
					 </div>
				</form>
			</div>
		);
	}
}

export default withRouter(withFirebase(Login));