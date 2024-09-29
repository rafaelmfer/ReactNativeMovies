const API_KEY = "48a1c71bcc40954184f8e61a5c3fb802";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint) => {
    const response = await fetch(
        `${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
};

export const fetchMovieDetails = async (movieId) => {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
};

export const fetchTVShows = async (endpoint) => {
    const response = await fetch(
        `${BASE_URL}/tv/${endpoint}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
};

export const fetchTVDetails = async (tvShowId) => {
    const response = await fetch(
        `${BASE_URL}/tv/${tvShowId}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
};
