import React from 'react';
import Layout from '../components/layout';
import Comments from '../components/Comments';
import { withFirebase } from '../context/FirebaseContext';

const CommentsPage = () => {
    return (
        <Layout>
            <h1>Firestore</h1>
            <p>This showcases the realtime database.</p>
            <p>
                Open this page in multiple tabs, then try to add a comment. This
                page will automatically update on each tab without needing to
                refresh!
            </p>
            <Comments />
        </Layout>
    );
};

export default withFirebase(CommentsPage);
