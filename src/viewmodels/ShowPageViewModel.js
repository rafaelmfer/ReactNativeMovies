import { useState, useEffect } from "react";
import { fetchMovieDetails, fetchTVDetails } from "../services/api";

export const useShowPageViewModel = (filmId, mediaType) => {
    const [filmDetails, setFilmDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                let details;
                if (mediaType === "movie") {
                    details = await fetchMovieDetails(filmId);
                } else {
                    details = await fetchTVDetails(filmId);
                }
                setFilmDetails(details);
            } catch (err) {
                console.log(err);
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [filmId]);

    return { filmDetails, loading, error };
};
