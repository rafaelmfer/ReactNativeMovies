import React, { useState } from "react";
import { View, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useMovieViewModel } from "../viewmodels/MovieViewModel";
import FlickerInfoCard from "../components/FlickerInfoCard";
import { useNavigation } from "@react-navigation/native";
import DropdownButton from "../components/DropdownButton";
import CustomBottomSheet from "../components/CustomBottomSheet";

const categories = [
    { label: "Now Playing", value: "now_playing" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
];

const HomeScreen = () => {
    const { movies, loading, error, setCategory } = useMovieViewModel();
    const [selectedCategory, setSelectedCategory] = useState("Popular");
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category.label);
        setCategory(category.value);
        closeModal();
    };

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
        <View style={styles.container}>
            <View style={styles.smallDropdown}>
                <DropdownButton label={selectedCategory} onPress={openModal} />
            </View>
            <CustomBottomSheet
                visible={modalVisible}
                onClose={closeModal}
                options={categories}
                selectedValue={selectedCategory}
                onSelect={handleCategorySelect}
            />
            <ScrollView>
                {movies.map((movie) => (
                    <FlickerInfoCard
                        key={movie.id}
                        item={movie}
                        onDetails={() =>
                            navigation.navigate("ShowPage", {
                                filmId: movie.id,
                                mediaType: "movie",
                            })
                        }
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    smallDropdown: {
        alignSelf:"center",
        marginTop: 16,
        marginBottom: 8,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
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
