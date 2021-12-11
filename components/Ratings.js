import React from "react";
import{
    View,
    Image,
    StyleSheet
} from 'react-native';

import { COLORS, icons } from "../constants";

const Ratings = ({ 
    rating, 
    iconStyle, 
    activeColor = COLORS.orange,
    inactivecolor = COLORS.lightOrange3,
}) => {
    return (
        <View
            style={{
                flexDirection: "row",
            }}
        > 
            <Image 
                source={icons.star}
                style={{
                    tintColor: rating >= 1 ? activeColor : inactivecolor,
                    ...styles.rateIcon,
                    ...iconStyle
                }}
            />

            <Image 
                source={icons.star}
                style={{
                    tintColor: rating >= 2 ? activeColor : inactivecolor,
                    ...styles.rateIcon,
                    ...iconStyle
                }}
            />

            <Image 
                source={icons.star}
                style={{
                    tintColor: rating >= 3 ? activeColor : inactivecolor,
                    ...styles.rateIcon,
                    ...iconStyle
                }}
            />

            <Image 
                source={icons.star}
                style={{
                    tintColor: rating >= 4 ? activeColor : inactivecolor,
                    ...styles.rateIcon,
                    ...iconStyle
                }}
            />

            <Image 
                source={icons.star}
                style={{
                    tintColor: rating >= 5 ? activeColor : inactivecolor,
                    ...styles.rateIcon,
                    ...iconStyle
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rateIcon: {
        height: 15,
        width: 15
    }
});

export default Ratings;