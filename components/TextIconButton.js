import React from "react";
import {
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from "react-native";
import { COLORS, FONTS, icons } from "../constants";

const TextIconButton = ({ containerStyle, label, labelStyle, icon, iconPosition, iconStyle, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: iconPosition == "LEFT" ? "row-reverse" : "row",
                alignItems: 'center',
                justifyContent: 'center',
                ...containerStyle,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    ...FONTS.body3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>

            <Image 
                source={icon}
                style={{
                    ...styles.image,
                    ...iconStyle,
                }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        marginLeft: 5,
        width: 20,
        height: 20,
    }
})

export default TextIconButton;