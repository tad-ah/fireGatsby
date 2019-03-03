import React from 'react';
import Layout from '../components/layout';
import VideoPlayer from '../components/VideoPlayer';

export default () => (
    <Layout>
        <h1>Storage</h1>
        <p>This showcases firebase storage.</p>
        <p>
            Here we fetch files from the Firebase Storage.
        </p>
        <VideoPlayer />
    </Layout>
);
