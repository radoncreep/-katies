import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import { images, FONTS, SIZES, COLORS } from "../../constants";

const AuthLayout = ({ title, subTitle, titleContainerStyle, children }) => {
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: SIZES.radius,
                backgroundColor: COLORS.white
            }}
        >
            {/* App Icon */}
            {/* title */}
            {/* subtitle */}
            <Text>{title}</Text>
        </View>
    )
};

export default AuthLayout;