import React from "react";
import{
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import { FONTS, COLORS } from "../constants";

const TextButton = ({ disabled, label, labelStyle, buttonContainerStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{ 
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                ...buttonContainerStyle
            }} 
            onPress={onPress}
            disabled={disabled}
        >
            <Text
                style={{ 
                    color: COLORS.white,
                    ...FONTS.h3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default TextButton;