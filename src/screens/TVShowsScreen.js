import React from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { useTVShowsViewModel } from "../viewmodels/TVShowsViewModel";
import FlickerInfoCard from "../components/FlickerInfoCard";

const TVShowsScreen = () => {
    const { tvShows, isLoading, error } = useTVShowsViewModel();

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={tvShows}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <FlickerInfoCard
                    key={item.id}
                    item={item}
                    onDetails={() => {
                        /* ShowPage */
                    }}
                />
            )}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 18,
    },
    listContainer: {
        padding: 10,
    },
});

export default TVShowsScreen;
