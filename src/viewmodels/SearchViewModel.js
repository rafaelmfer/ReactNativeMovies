import { useState, useEffect } from "react";
import { searchMovieOrTV } from "../services/api";

export const useSearchViewModel = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchType, setSearchType] = useState("multi");

    useEffect(() => {
        const searchMoviesOrTVShows = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await searchMovieOrTV(searchType, query);
                setResults(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setError("Failed to fetch search results. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        searchMoviesOrTVShows();
    }, [query, searchType]);

    return {
        results,
        loading,
        error,
        setQuery,
        searchType,
        setSearchType,
    };
};
