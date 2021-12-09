import React, { useState } from 'react';
import {
    Text,
    View
} from 'react-native';
import { CartQuantityButton, Header, IconButton } from '../../components';

import { FONTS, COLORS, SIZES, images, icons } from "../../constants";

const FoodDetails = ({ navigation, route }) => {
    // console.log('params ', route?.params);
    const foodProperties = route?.params;

    const [ foodItem, setFoodItem ] = useState(foodProperties);


    function renderHeader() {
        return (
            <Header 
                title="DETAILS"
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 10
                }}
                leftComponent={
                    <IconButton 
                        icon={icons.back}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: SIZES.radius,
                            borderColor: COLORS.gray2
                        }}
                        iconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray2
                        }}
                        onPress={() => navigation.goBack()}
                    />
                }
                rightComponent={
                    <CartQuantityButton 
                        quantity={3}
                    />
                }
            />
        )
    }

    return (
        <View 
            style={{ 
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Body */}

            {/* Footer */}
        </View>
    )
}

export default FoodDetails;