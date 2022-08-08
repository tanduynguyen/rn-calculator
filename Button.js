import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';

const baseContainer = {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff'
}

const baseText = {
    fontSize: 36
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...baseContainer,
        backgroundColor: '#fafafa',
    },
    text: {
        ...baseText
    },
    specialContainer: {
        flex: 2,
        ...baseContainer,
        backgroundColor: '#9bc23c',
    },
    specialText: {
        ...baseText,
        color: '#fff'
    }
});

class Button extends React.Component {
    render() {
    const { text, special, onPress } = this.props;
    return (
    <TouchableOpacity 
    onPress={() => {
        this.text.rubberBand(400);
        onPress(text);
    }}
    style={special ? styles.specialContainer : styles.container}>
    <Animatable.Text
        ref={(ref) => {
            this.text = ref;
        }}
        animation="pulse"
        easing="ease-out"
        iterationCount={1}
        style={special ? styles.specialText : styles.text}>
        {text}</Animatable.Text>
    </TouchableOpacity>
    );
    }
}

export default Button;