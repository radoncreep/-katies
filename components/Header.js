import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTS } from '../constants';

export default function Header({ containerStyle, title, titleStyle, leftComponent, rightComponent }) {
    return (
        <View style={ [ styles.container, {...containerStyle } ] }>
            {/* Left */}
            {leftComponent}

            {/* title */}
            <View style={styles.headerTitleContainer}>
                <Text 
                    style={{ ...FONTS.h3, ...titleStyle }}
                >
                    {title}
                </Text>
            </View>

            {/* right */}
            {rightComponent}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})