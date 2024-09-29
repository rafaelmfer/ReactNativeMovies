import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { useTVShowsViewModel } from "../viewmodels/TVShowsViewModel";
import FlickerInfoCard from "../components/FlickerInfoCard";
import { useNavigation } from "@react-navigation/native";
import DropdownButton from "../components/DropdownButton";
import CustomBottomSheet from "../components/CustomBottomSheet";

const categories = [
    { label: "Airing Today", value: "airing_today" },
    { label: "On The Air", value: "on_the_air" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
];

const TVShowsScreen = () => {
    const { tvShows, isLoading, error, setCategory } = useTVShowsViewModel();
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
        <View style={styles.container}>
            <DropdownButton label={selectedCategory} onPress={openModal} />
            <CustomBottomSheet
                visible={modalVisible}
                onClose={closeModal}
                options={categories}
                selectedValue={selectedCategory}
                onSelect={handleCategorySelect}
            />
            <ScrollView>
                {tvShows.map((item) => (
                    <FlickerInfoCard
                        key={item.id}
                        item={item}
                        onDetails={() => {
                            navigation.navigate("ShowPage", {
                                filmId: item.id,
                                mediaType: "tv",
                            });
                        }}
                    />
                ))}
            </ScrollView>
        </View>
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
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
});

export default TVShowsScreen;
