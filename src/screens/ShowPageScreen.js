import React, { useEffect } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    Image,
    StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useShowPageViewModel } from "../viewmodels/ShowPageViewModel";

const ShowPageScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { filmId, mediaType } = route.params;

    const { filmDetails, loading, error } = useShowPageViewModel(
        filmId,
        mediaType
    );

    useEffect(() => {
        if (filmDetails) {
            navigation.setOptions({
                title: filmDetails.title || filmDetails.name,
            });
        }
    }, [filmDetails]);

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
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>
                {filmDetails.title || filmDetails.name}
            </Text>
            <Image
                source={{
                    uri: `https://image.tmdb.org/t/p/w500/${filmDetails.poster_path}`,
                }}
                style={styles.poster}
            />
            <Text style={styles.overview}>{filmDetails.overview}</Text>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.releaseDate}>
                    Popularity: {filmDetails.popularity}
                    {" | "}
                </Text>
                <Text style={styles.releaseDate}>
                    Release Date:{" "}
                    {filmDetails.release_date || filmDetails.first_air_date}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        marginBottom: 32,
    },
    poster: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        alignSelf: "center",
        fontSize: 24,
        fontWeight: "bold",

        marginTop: 32,
        marginBottom: 24,
    },
    overview: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24,
    },
    releaseDate: {
        marginTop: 16,
        fontSize: 14,
        fontWeight: "bold",
        color: "gray",
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

export default ShowPageScreen;
