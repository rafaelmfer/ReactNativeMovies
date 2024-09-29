import { useState, useEffect } from "react";
import { fetchTVShows } from "../services/api";

export const useTVShowsViewModel = () => {
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTvShows = async () => {
            try {
                const data = await fetchTVShows("popular");
                setTvShows(data);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadTvShows();
    }, []);

    return { tvShows, loading };
};
