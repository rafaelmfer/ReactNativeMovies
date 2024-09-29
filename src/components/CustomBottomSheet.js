// CustomBottomSheet.js
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomBottomSheet = ({
    visible,
    onClose,
    options,
    selectedValue,
    onSelect,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.sheetContainer}>
                    <View style={styles.handle} />

                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={[
                                styles.option,
                                selectedValue === option.label &&
                                    styles.selectedOption,
                            ]}
                            onPress={() => {
                                onSelect(option);
                                onClose();
                            }}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    selectedValue === option.label &&
                                        styles.optionSelectedText,
                                ]}
                            >
                                {option.label}
                            </Text>
                            {selectedValue === option.label && (
                                <MaterialIcons
                                    name="check"
                                    size={24}
                                    color="white"
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    sheetContainer: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 12,
        elevation: 5,
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 10,
        alignSelf: "center",
        marginBottom: 16,
    },
    option: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        flexDirection: "row",
        alignItems: "center",
    },
    selectedOption: {
        backgroundColor: "#36776f",
    },
    optionText: {
        color: "black",
        marginRight: 8,
    },
    optionSelectedText: {
        color: "white",
    },
});

export default CustomBottomSheet;
