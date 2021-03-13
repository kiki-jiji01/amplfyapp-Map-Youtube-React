import axios from 'axios';

const KEY = 'AIzaSyC8TObc-42ezqT3q6fb2qPDBnxjltnay6A'; // mention your youtube API key here

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})
