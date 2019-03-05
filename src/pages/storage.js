import React from 'react';
import Layout from '../components/layout';
import VideoPlayer from '../components/VideoPlayer';
import { withFirebase } from '../context/FirebaseContext';

const StoragePage = ({ context }) => (
    <Layout>
        <h1>Storage</h1>
        <p>This showcases firebase storage.</p>
        <p>Here we fetch files from the Firebase Storage.</p>
        {context.user ? (
            <VideoPlayer />
        ) : (
            <p>
                <i>Please log in!</i>
            </p>
        )}
    </Layout>
);

export default withFirebase(StoragePage);
