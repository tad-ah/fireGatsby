import React from 'react';
import { Firebase } from '../firebase';

const Context = React.createContext({});

class FirebaseProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firebase: new Firebase(),
            user: null,
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const { firebase } = this.state;
        const auth = firebase.auth;
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    logout() {
        const { firebase } = this.state;
        const auth = firebase.auth;
        auth.signOut().then(() => {
            this.setState({
                user: null,
            });
        });
    }

    login() {
        const { firebase } = this.state;
        const auth = firebase.auth;
        const provider = firebase.provider;
        auth.signInWithPopup(provider).then(result => {
            const user = result.user;
            this.setState({
                user,
            });
        });
    }

    render() {
        const { firebase, user } = this.state;
        return (
            <Context.Provider
                value={{
                    firebase,
                    user,
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

export { FirebaseProvider, withFirebase, withAuthentication, Context };
