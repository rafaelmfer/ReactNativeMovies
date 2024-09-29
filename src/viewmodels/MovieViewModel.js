import { useState, useEffect } from "react";
import { fetchMovies } from "../services/api";

export const useMovieViewModel = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("popular");

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            try {
                const data = await fetchMovies(category);
                setMovies(data);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [category]);

    return { movies, loading, error, setCategory };
};
