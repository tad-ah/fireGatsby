import React, { Component, useState } from 'react';
import styled from 'styled-components';
import { Db } from '../firebase';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        };
    }

    componentWillMount() {
        Db.getComments().then(comments => this.setState({ comments }));
        Db.subscribeToComments(comments => this.setState({ comments })); //.then(comments => this.setState({ comments }));
    }

    addComment = comment => {
        Db.addComment(comment);
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
            <li key={el.id}>{el.text} - {el.time}</li>
        ))}
    </ul>
);

export default Comments;
