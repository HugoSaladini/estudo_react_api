import axios from 'axios';

// Base da URL => https://api.themoviedb.org/3
//https://api.themoviedb.org/3/movie/550?api_key=6065036b550e5c3188be6d6ddb9b4340

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
