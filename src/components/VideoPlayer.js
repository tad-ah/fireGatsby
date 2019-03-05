import React, { Component } from 'react';
import styled from 'styled-components';
import { Storage } from '../firebase';
import { withFireAuthentication } from '../context/FirebaseContext';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const smallVideo =
    'gs://firegatsby.appspot.com/spider-man-into-the-spider-verse-trailer-1_h480p.mov';
const bigVideo =
    'gs://firegatsby.appspot.com/spider-man-into-the-spider-verse-trailer-3_h1080p.mov';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: '',
            smallVideoSize: '',
            bigVideoSize: '',
        };
    }

    componentDidMount() {
        const { firebase } = this.props.context;
        this.storage = new Storage(firebase.storage);

        this.fetchSpiderManVideo();

        this.storage
            .getFileSize(smallVideo)
            .then(metadata =>
                this.setState({ smallVideoSize: metadata.size / 1e6 })
            );
        this.storage
            .getFileSize(bigVideo)
            .then(metadata =>
                this.setState({ bigVideoSize: metadata.size / 1e6 })
            );
    }

    fetchSpiderManVideo = () =>
        this.storage
            .fetchVideo(smallVideo)
            .then(videoUrl => this.setState({ videoUrl }));

    fetchBigSpiderManVideo = () =>
        this.storage
            .fetchVideo(bigVideo)
            .then(videoUrl => this.setState({ videoUrl }));

    render() {
        return (
            <Container>
                <div>
                    <video
                        width="640"
                        height="100%"
                        controls
                        src={this.state.videoUrl}
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div>
                        <button onClick={this.fetchSpiderManVideo}>
                            {`Spiderman trailer (${
                                this.state.smallVideoSize
                            } MB)`}
                        </button>
                        <button onClick={this.fetchBigSpiderManVideo}>
                            {`Big Spiderman trailer (${
                                this.state.bigVideoSize
                            } MB)`}
                        </button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default withFireAuthentication(VideoPlayer);
