import { Text, View, StyleSheet } from "react-native";

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Movies App</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#37474f",
        paddingTop: 56,
        paddingBottom: 12,
        alignItems: "center",
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});
