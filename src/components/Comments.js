import React, { Component, useState } from 'react';
import styled from 'styled-components';
import { Database } from '../firebase';
import { withFirebase } from '../context/FirebaseContext';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const CommentTimestamp = styled.small`
    color: grey;
`;

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        };
    }

    componentDidMount() {
        const { firebase, user } = this.props.context;
        if (user) {
            this.Db = new Database(firebase.database);
            this.Db.getComments().then(comments => this.setState({ comments }));
            this.Db.subscribeToComments(comments =>
                this.setState({ comments })
            );
        }
    }

    addComment = comment => {
        this.Db.addComment(comment);
    };

    render() {
        if (!this.props.context.user) {
            return (
                <p>
                    <i>Please login!</i>
                </p>
            );
        }

        return (
            <Container>
                <CommentInput saveComment={this.addComment} />
                <CommentList comments={this.state.comments} />
            </Container>
        );
    }
}

const CommentInput = ({ saveComment }) => {
    const [value, setValue] = useState('');
    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                saveComment(value);
                setValue('');
            }}
        >
            <input
                onChange={event => setValue(event.target.value)}
                value={value}
            />
            <button type={'submit'}>Submit</button>
        </form>
    );
};

const CommentList = ({ comments }) => (
    <ul>
        {comments.map(el => (
            <li key={el.id}>
                {el.text} - <CommentTimestamp>{el.time}</CommentTimestamp>
            </li>
        ))}
    </ul>
);

export default withFirebase(Comments);
