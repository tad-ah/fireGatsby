import React from 'react';
import { Firebase } from '../firebase';

const Context = React.createContext({});

class FirebaseProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firebase: new Firebase(),
            user: null,
            claims: {},
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const { auth } = this.state.firebase;
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });

                this.fetchCustomClaims();
            }
        });
    }

    logout() {
        const { auth } = this.state.firebase;
        auth.signOut().then(() => {
            this.setState({
                user: null,
                claims: null,
            });
        });
    }

    login() {
        const { firebase } = this.state;
        const auth = firebase.auth;
        const provider = firebase.provider;
        auth.signInWithPopup(provider).then(result => {
            const user = result.user;
            console.log(user);
            this.setState({
                user,
            });

            this.fetchCustomClaims();
        });
    }

    fetchCustomClaims = () => {
        const { auth } = this.state.firebase;
        auth.currentUser
            .getIdTokenResult()
            .then(idTokenResult => {
                // Confirm the user is an Admin.
                if (!!idTokenResult.claims.admin) {
                    console.log(idTokenResult.claims);
                    this.setState({
                        claims: idTokenResult.claims,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { firebase, user, claims } = this.state;
        return (
            <Context.Provider
                value={{
                    firebase,
                    user,
                    claims,
                    test: this.props.test,
                    login: this.login,
                    logout: this.logout,
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

const PleaseLoginMessage = () => (
    <p>
        <i>Please login!</i>
    </p>
);

const withFirebase = WrappedComponent => {
    const WithHOC = props => {
        return (
            <Context.Consumer>
                {context => <WrappedComponent {...props} context={context} />}
            </Context.Consumer>
        );
    };
    WithHOC.WrappedComponent = WrappedComponent;

    return WithHOC;
};

const withAuthentication = WrappedComponent => {
    const WithHOC = props => {
        return (
            <Context.Consumer>
                {context =>
                    context.user ? (
                        <WrappedComponent {...props} context={context} />
                    ) : (
                        <PleaseLoginMessage />
                    )
                }
            </Context.Consumer>
        );
    };
    WithHOC.WrappedComponent = WrappedComponent;

    return WithHOC;
};

const withFireAuthentication = WrappedComponent =>
    withFirebase(withAuthentication(WrappedComponent));

export {
    FirebaseProvider,
    Context,
    withFirebase,
    withAuthentication,
    withFireAuthentication,
};
