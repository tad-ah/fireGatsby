import React from 'react';
import Layout from '../components/layout';
import Comments from '../components/Comments';

export default () => (
    <Layout>
        <h1>This is a demo for the comment feature!</h1>
        <p>
            Try opening this page in multiple tabs, then try to add a comment. This page will automatically update on each tab and each device without needing to refresh!
        </p>

        <Comments />
    </Layout>
);
