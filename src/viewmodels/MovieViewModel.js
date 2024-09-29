import { useState, useEffect } from "react";
import { fetchMovies } from "../services/api";

export const useMovieViewModel = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchMovies("popular");
                setMovies(data);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    return { movies, loading, error };
};
