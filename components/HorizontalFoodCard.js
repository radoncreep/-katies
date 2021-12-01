import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';
import { COLORS, FONTS, SIZES, icons } from "../constants";

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...containerStyle
            }}
        >
            {/* Image */}
            <Image
                source={item.image}
                style={imageStyle}
            />

            {/* Info */}
            <View style={{ flex: 1 }}>
                {/* Name */}
                <Text style={{ ...FONTS.h3, fontSize: 17 }}>
                    {item.name}
                </Text>

                {/* Description */}
                <Text style={{ color: COLORS.darkGray2, ...FONTS.body4 }}>
                    {item.description}
                </Text>

                {/* Price */}
                <Text style={{ marginTop: SIZES.base, ...FONTS.h3 }}>
                    ${item.price}
                </Text>

                {/* Calories */}
                <View 
                    style={{ 
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: -6,
                        right: SIZES.radius
                    }}
                >
                    <Image 
                        source={icons.calories}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                    <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>
                        {item.calories} Calories
                    </Text>
                </View>
            </View>
            {/* Calories */}

        </TouchableOpacity>
    )
}

export default HorizontalFoodCard;