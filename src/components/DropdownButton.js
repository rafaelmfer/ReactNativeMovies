import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DropdownButton = ({ label, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{label}</Text>
            <Icon name="chevron-down" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        marginRight: 24,
        marginLeft: 4
    },
    icon: {
        marginLeft: 24,
    },
});

export default DropdownButton;
