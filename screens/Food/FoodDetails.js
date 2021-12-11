import React, { useState } from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CartQuantityButton, Header, IconButton, IconLabel, LineDivider, Ratings, StepperInput, TextButton } from '../../components';

import { FONTS, COLORS, SIZES, images, icons, dummyData } from "../../constants";

const FoodDetails = ({ navigation, route }) => {
    // console.log('params ', route?.params);
    const foodProperties = route?.params;

    const [ foodItem, setFoodItem ] = useState(foodProperties);
    const [ selectedSize, setSelectedSize ] = useState("");
    const [ quantity, setQuantity ] = useState(1);

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

    function renderDetails() {
        return(
            <View
                style={{
                    marginTop: SIZES.radius,
                    marginBottom: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* Food Cart section */}
                <View 
                    style={{
                        height: 190,
                        borderRadius: 15,
                        backgroundColor: COLORS.lightGray2
                    }}
                >
                    {/* Calories and Favourite */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: SIZES.base,
                            paddingHorizontal: SIZES.radius
                        }}
                    >
                        {/* Calories */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <Image 
                                source={icons.calories}
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />

                            <Text style={{ color: COLORS.darkGray2, ...FONTS.body4}}>
                                {foodProperties?.calories}
                            </Text>
                        </View>

                        {/* Favorite */}
                        <Image 
                            source={icons.love}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: foodProperties?.isFavourite ? 
                                    COLORS.primary : COLORS.gray
                            }}
                        />
                    </View>

                    {/* Food Image */}
                    <Image 
                        source={foodProperties?.image}
                        resizeMode="contain"
                        style={{
                            height: 170,
                            width: "100%"
                        }}
                    />
                </View>

                {/* Food Info section */}
                <View style={{ marginTop: SIZES.padding}}>
                    {/* Food Name */}
                    <Text 
                        style={{
                           ...FONTS.h1
                        }}
                    >
                        {foodProperties?.name}
                    </Text>

                    {/* Food Description */}
                    <Text 
                        style={{
                            marginTop: SIZES.padding,
                            color: COLORS.darkGray2,
                            textAlign: "justify",
                            ...FONTS.body3
                        }}
                    >
                        {foodProperties?.description}
                    </Text>

                    {/* rating, duration, shipping */}
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: SIZES.padding,
                            alignItems: "center"
                        }}
                    >
                        {/* Ratings */}
                        <IconLabel 
                            containerStyle={{
                                backgroundColor: COLORS.primary,
                                padding: 5
                            }}
                            icon={icons.star}
                            label="4.5"
                            labelStyle={{
                                color: COLORS.white
                            }}
                        />

                        {/* Duration */}
                        <IconLabel 
                            containerStyle={{
                                marginLeft: SIZES.radius,
                                paddingHorizontal: 0
                            }}
                            icon={icons.clock}
                            labelStyle={{
                                color: COLORS.black
                            }}
                            label="30 mins"
                        />
                        
                        {/* Shipping */}
                        <IconLabel 
                            containerStyle={{
                                marginLeft: SIZES.radius,
                                paddingHorizontal: 0
                            }}
                            icon={icons.dollar}
                            labelStyle={{
                                color: COLORS.black
                            }}
                            label="Free Shipping"
                        />
                    </View>

                    {/* Sizes */}
                    <View
                        style={{
                            flexDirection: "row",
                            // justifyContent: "space-between",
                            marginTop: SIZES.padding,
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>
                            Sizes:
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                marginLeft: SIZES.padding,
                            }}
                        >
                            {dummyData.sizes.map((item, index) => {
                                return (
                                    <TextButton 
                                        key={`Sizes-${index}`}
                                        buttonContainerStyle={{
                                            width: 40,
                                            height: 40,
                                            margin: SIZES.base,
                                            borderWidth: 1,
                                            borderRadius: SIZES.radius,
                                            borderColor: selectedSize === item.id ? COLORS.primary : COLORS.gray2,
                                            backgroundColor: selectedSize === item.id ? COLORS.primary : null
                                        }}
                                        label={item.label}
                                        labelStyle={{
                                            color: selectedSize === item.id ? COLORS.white : COLORS.gray2,
                                            ...FONTS.body2
                                        }}
                                        onPress={() => setSelectedSize(item.id)}
                                    />
                                )
                            })}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function renderRestaurant() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginVertical: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    alignItems:"center"
                }}
            >
                <Image 
                    source={images.profile}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: SIZES.radius
                    }}
                />

                {/* Info */}
                <View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        justifyContent: "center"
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>@Katies</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                        {/* distance from you */}
                        1.2 KM away from you
                    </Text>
                </View>

                {/* Ratings section */}
                <Ratings 
                    rating={4}
                    iconStyle={{
                        marginLeft: 3
                    }}
                />
            </View>
        )
    }

    function renderFooter() {
        return (
            <View 
                style={{
                    flexDirection: "row",
                    height: 100,
                    alignItems: "center",
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.radius,
                }}
            >
                {/* Stepper Input */}
                <StepperInput 
                    value={quantity}
                    onAdd={() => setQuantity(quantity + 1)}
                    onMinus={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                        }
                    }}
                />

                {/* Text Button */}
                <TextButton 
                    buttonContainerStyle={{
                        flex: 1,
                        flexDirection: "row",
                        height: 60,
                        marginLeft: SIZES.radius,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}
                    label="Buy Now"
                    label2="$15.99"
                    onPress={() => navigation.navigate("MyCart")}
                />
            </View>
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
            <ScrollView>
                {/* Food detail; section */}
                {renderDetails()}

                <LineDivider />

                {/* Restaurant */}
                {renderRestaurant()}
            </ScrollView>

            <LineDivider />

            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

export default FoodDetails;