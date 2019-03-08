import React, { Component, useState } from 'react';
import styled from 'styled-components';
import { Database } from '../firebase';
import { withFireAuthentication } from '../context/FirebaseContext';
import { Input, Button, Form } from 'semantic-ui-react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
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

    addComment = comment => this.Db.addComment(comment);

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
        <Form
            onSubmit={event => {
                event.preventDefault();
                saveComment(value);
                setValue('');
            }}
        >
            <Form.Field>
                <Input
                    onChange={event => setValue(event.target.value)}
                    placeholder="Search..."
                    labelPosition={'right'}
                    label={<Button color={'teal'}>Submit</Button>}
                />
            </Form.Field>
        </Form>
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

export default withFireAuthentication(Comments);
