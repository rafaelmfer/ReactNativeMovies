import React from "react";
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useMovieViewModel } from "../viewmodels/MovieViewModel";
import FlickerInfoCard from "../components/FlickerInfoCard";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const { movies, loading, error } = useMovieViewModel();
    const navigation = useNavigation();

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {movies.map((movie) => (
                <FlickerInfoCard
                    key={movie.id}
                    item={movie}
                    onDetails={() =>
                        navigation.navigate("ShowPage", { filmId: movie.id, mediaType: "movie" })
                    }
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 18,
    },
});

export default HomeScreen;
