import React from 'react';
import Layout from '../components/layout';
import ProfilePage from '../components/ProfilePage';

export default () => (
    <Layout>
        <h1>Storage</h1>
        <p>This showcases firebase storage.</p>
        <p>Here we upload files to Firebase Storage.</p>
        <ProfilePage />
    </Layout>
);
