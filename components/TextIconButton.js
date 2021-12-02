import React from "react";
import {
    TouchableOpacity,
    Text,
    Image
} from "react-native";
import { COLORS, FONTS, icons } from "../constants";

const TextIconButton = ({ containerStyle, label, labelStyle, icon, iconStyle, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...containerStyle
            }}
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
                    marginLeft: 5,
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black,
                    ...iconStyle
                }}
            />
        </TouchableOpacity>
    )
}

export default TextIconButton;