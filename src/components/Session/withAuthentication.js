import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser: authUser })
          : this.setState({ authUser: null });
          
          if(authUser) {
            var user = this.props.firebase.user(authUser.uid)
            .once('value')
            .then(snapshot => {
                const dbUser = snapshot.val();
                //console.log(dbUser.role);
                //this.setState({ authUser: authUser })
                const dbUserRole = (dbUser.role ? dbUser.role : 'user');
                const addRole = { role: dbUserRole };
                const addRoleToAuthUser = Object.assign(authUser, addRole);
                this.setState({ authUser: addRoleToAuthUser })
            });
          }

      });

     

    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;