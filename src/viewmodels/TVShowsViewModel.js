import { useState, useEffect } from "react";
import { fetchTVShows } from "../services/api";

export const useTVShowsViewModel = () => {
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("popular");

    useEffect(() => {
        const loadTvShows = async () => {
            setLoading(true);
            try {
                const data = await fetchTVShows(category);
                setTvShows(data);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadTvShows();
    }, [category]);

    return { tvShows, loading, error, setCategory};
};
