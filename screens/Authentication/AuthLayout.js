import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { images, FONTS, SIZES, COLORS } from "../../constants";

const AuthLayout = ({ title, subTitle, titleContainerStyle, children }) => {
    return (
        <View
            style={{
                flex: 1,
                // paddingHorizontal: SIZES.radius,
                backgroundColor: COLORS.white
            }}
        >
            {/* App Icon */}
            <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                contentContainerStyle={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <View style={{ alignItems: "center" }}>
                    <Image 
                        source={images.logo_02}
                        resizeMode="contain"
                        style={{
                            height: 100,
                            width: 200
                        }}
                    />
                </View>
                
                {/* title */}
                <View
                    style={{
                        marginTop: SIZES.padding,
                        ...titleContainerStyle
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.h2
                        }}
                    >
                        {title}
                    </Text>

                    {/* subtitle */}
                    <Text
                        style={{
                            textAlign: "center",
                            color: COLORS.darkGray,
                            marginTop: SIZES.base,
                            ...FONTS.body3
                        }}
                    >
                        {subTitle}
                    </Text>
                </View>

                {/* Content / Children */}
                {children}
            </KeyboardAwareScrollView>
        </View>

    )
};

export default AuthLayout;