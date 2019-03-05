class Storage {
    constructor(storage) {
        this.storage = storage;
    }

    getFileSize = url => this.storage.refFromURL(url).getMetadata();

    fetchVideo = url => this.storage.refFromURL(url).getDownloadURL();
}

export default Storage;
