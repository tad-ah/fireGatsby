import React, { Component, useState } from 'react';
import styled from 'styled-components';
import { Database, Firebase } from '../firebase';

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
        this.firebase = new Firebase();
        this.Db = new Database(this.firebase.database);
        this.Db.getComments().then(comments => this.setState({ comments }));
        this.Db.subscribeToComments(comments => this.setState({ comments })); //.then(comments => this.setState({ comments }));
    }

    addComment = comment => {
        this.Db.addComment(comment);
    };

    render() {
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

export default Comments;
