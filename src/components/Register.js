import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withFirebase } from "./Firebase";
import { AuthUserContext } from './Session';

const INITIAL_STATE = {
	username: "",
	email: "",
	passwordOne: "",
	passwordTwo: "",
	error: null
};

const Register = ({ authUser, ...props }) => (
    <AuthUserContext.Consumer>
        {authUser =>
            !authUser ? <RegisterForm {...props} /> : <Redirect to='/' />
        }
    </AuthUserContext.Consumer>
);

class RegisterForm extends Component {
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
		
		const { username, email, passwordOne } = this.state;

		this.props.firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(authUser => {
				// Create a user in your Firebase realtime database
				return this.props.firebase.user(authUser.user.uid).set({
					username,
					email
				});
			})
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({ error });
			});
		
	};

	render() {
		const { username, email, passwordOne, passwordTwo, error } = this.state;

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === "" ||
			email === "" ||
			username === "";

		return (
			<div className="page">
				<h1>Register</h1>
				{error && <p>{error.message}</p>}
				<form onSubmit={this.handleSubmit}>
					<div className="form-field">
						<label htmlFor="username">Your Name</label>
						<input
							type="text"
							id="username"
							placeholder="Your Name"
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className="form-field">
						<label htmlFor="email">Email Address</label>
						<input
							type="email"
							id="email"
							placeholder="Email Address"
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className="form-field">
						<label htmlFor="passwordOne">Password</label>
						<input
							type="password"
							id="passwordOne"
							placeholder="Password"
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className="form-field">
						<label htmlFor="passwordTwo">Password Again</label>
						<input
							type="password"
							id="passwordTwo"
							placeholder="Password Again"
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className="form-field">
						<button disabled={isInvalid} type="submit">
							Register
						</button>
					 </div>
				</form>
			</div>
		);
	}
}

export default withRouter(withFirebase(Register));