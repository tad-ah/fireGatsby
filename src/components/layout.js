import React from 'react';
import { Link } from 'gatsby';
import { withFirebase, FirebaseProvider } from '../context/FirebaseContext';
import { Button, Message } from 'semantic-ui-react';
import './layout.css';
import 'semantic-ui-css/semantic.min.css';

const ListLink = props => (
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
        <Link to={props.to}>{props.children}</Link>
    </li>
);

const Avatar = props => (
    <img style={{ width: '5%', height: '5%' }} src={props.photo} />
);

const MessageAdmin = () => (
    <Message positive>
        <Message.Header>You are an admin!</Message.Header>
        <p>ggwp</p>
    </Message>
);

const MessageNormalUser = () => (
    <Message info header="You are not an admin!" content="Sorry :(" />
);

const Header = props => {
    return (
        <header style={{ marginBottom: `1.5rem` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link
                    to="/"
                    style={{ textShadow: `none`, backgroundImage: `none` }}
                >
                    <h3 style={{ display: `inline` }}>FireGatsby</h3>
                </Link>

                <ul
                    style={{
                        display: 'flex',
                        float: 'right',
                        justifyContent: 'flex-end',
                    }}
                >
                    <ListLink to="/">Home</ListLink>
                    <ListLink to="/comments/">Firestore</ListLink>
                    <ListLink to="/storage/">Storage</ListLink>
                    <ListLink to="/storage-upload/">Upload</ListLink>
                    {props.context.user ? (
                        <Button color={'red'} onClick={props.context.logout}>
                            Log Out
                        </Button>
                    ) : (
                        <Button onClick={props.context.login}>Log In</Button>
                    )}
                </ul>

                {props.context.user && (
                    <Avatar
                        logout={props.context.logout}
                        username={props.context.user.displayName}
                        photo={props.context.user.photoURL}
                    />
                )}
                {props.context.claims && props.context.claims.admin ? (
                    <MessageAdmin />
                ) : (
                    <MessageNormalUser />
                )}
            </div>
        </header>
    );
};

const HeaderWithFirebase = withFirebase(Header);

export default ({ children }) => (
    <div style={{ margin: `3rem auto`, maxWidth: 900, padding: `0 1rem` }}>
        <FirebaseProvider>
            <HeaderWithFirebase />
            {children}
        </FirebaseProvider>
    </div>
);
