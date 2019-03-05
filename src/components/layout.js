import React from 'react';
import { Link } from 'gatsby';
import { withFirebase, FirebaseProvider } from '../context/FirebaseContext';

const ListLink = props => (
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
        <Link to={props.to}>{props.children}</Link>
    </li>
);

const Avatar = props => (
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
        {props.username}
        <img alt={'User avatar'} src={props.photo} style={{ width: '10%' }} />
        <button onClick={props.logout}>Log Out</button>
    </li>
);

const Header = props => {
    return (
        <header style={{ marginBottom: `1.5rem` }}>
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
                <ListLink to="/storage-upload/">Storage Upload</ListLink>

                {props.context.user ? (
                    <Avatar
                        logout={props.context.logout}
                        username={props.context.user.displayName}
                        photo={props.context.user.photoURL}
                    />
                ) : (
                    <button onClick={props.context.login}>Log In</button>
                )}
            </ul>
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
