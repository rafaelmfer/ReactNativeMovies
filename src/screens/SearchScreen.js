import React, { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSearchViewModel } from "../viewmodels/SearchViewModel";
import FlickerInfoCard from "../components/FlickerInfoCard";
import DropdownButton from "../components/DropdownButton";
import CustomBottomSheet from "../components/CustomBottomSheet";

const searchTypes = [
    { label: "Movies", value: "movie" },
    { label: "Multi", value: "multi" },
    { label: "TV Shows", value: "tv" },
];

const SearchScreen = () => {
    const navigation = useNavigation();
    const { results, loading, error, setQuery, searchType, setSearchType } = useSearchViewModel();
    const [selectedSearchType, setSelectedSearchType] = useState("Multi");
    const [modalVisible, setModalVisible] = useState(false);
    const [queryInput, setQueryInput] = useState("");

    const [inputError, setInputError] = useState(false);
    
    const [searchInitiated, setSearchInitiated] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSearchTypeSelect = (searchType) => {
        setSelectedSearchType(searchType.label);
        setSearchType(searchType.value);
        closeModal();
    };

    const handleSearch = () => {
        if (queryInput.trim() === "") {
            setInputError(true);
        } else {
            setQuery(queryInput);
            setInputError(false);
            setSearchInitiated(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Search Movie/TV Show Name <Text style={styles.asterisk}>*</Text>
            </Text>

            <View style={styles.searchContainer}>
                <View
                    style={[
                        styles.inputContainer,
                        inputError ? { borderColor: "red", borderWidth: 1 } : {},
                    ]}
                >
                    <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="i.e. James Bond, CSI"
                        value={queryInput}
                        onChangeText={setQueryInput}
                        onFocus={() => setInputError(false)}
                    />
                </View>
            </View>

            <View style={styles.searchTypeSection}>
                <View style={styles.searchTypeContainer}>
                    <Text style={styles.dropdownLabel}>
                        Choose Search Type <Text style={styles.asterisk}>*</Text>
                    </Text>
                    <DropdownButton label={selectedSearchType} onPress={openModal} />
                    {inputError ? (
                        <Text style={styles.errorText}>Movie/TV show name is required</Text>
                    ) : (
                        <Text style={styles.hintText}>Please select a search type</Text>
                    )}
                </View>

                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Icon
                        name="search"
                        size={20}
                        color="#fff"
                        style={styles.searchButtonIcon}
                    />
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <CustomBottomSheet
                visible={modalVisible}
                onClose={closeModal}
                options={searchTypes}
                selectedValue={selectedSearchType}
                onSelect={handleSearchTypeSelect}
            />

            {!searchInitiated && !loading && (
                <View style={styles.centeredMessageContainer}>
                    <Text style={styles.centeredMessage}>Please initiate a search</Text>
                </View>
            )}

            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            {searchInitiated && !loading && results.length > 0 && (
                <ScrollView>
                    {results.map((item) => (
                        <FlickerInfoCard
                            key={item.id}
                            item={item}
                            onDetails={() =>
                                navigation.navigate("ShowPage", {
                                    filmId: item.id,
                                    mediaType:
                                    searchType === "multi"
                                            ? item.media_type
                                            : searchType,
                                })
                            }
                        />
                    ))}
                </ScrollView>
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    asterisk: {
        color: "red",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    searchTypeSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    searchTypeContainer: {
        flex: 1,
    },
    dropdownLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    hintText: {
        fontSize: 12,
        color: "#888",
        marginTop: 4,
    },
    errorText: {
        fontSize: 12,
        color: "red",
        marginTop: 4,
    },
    searchButton: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3498db",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 12,
        justifyContent: "center",
    },
    searchButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    searchButtonIcon: {
        marginRight: 8,
    },
    centeredMessageContainer: {
        flex: 1,
        alignItems: "center",
    },
    centeredMessage: {
        marginTop: 80,
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
});

export default SearchScreen;
