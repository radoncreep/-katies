import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    CardInput,
    CardItem, 
    FooterTotal, 
    FormInput, 
    Header, 
    IconButton 
} from '../../components';

import { FONTS, COLORS, SIZES, icons, dummyData } from '../../constants';

const Checkout = ({ navigation, route }) => {

    const [ selectedCard, setSelectedCard ] = useState(null);

    useEffect(() => {
        let { selectedCard } = route.params;

        setSelectedCard(selectedCard);
    }, []);

    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 10,
                    alignItems: "center"
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
                    <View style={{ width: 40 }} />
                }
                title="Checkout"
                titleStyle={{
                    ...FONTS.h2,
                    fontSize: 20
                }}
            />
        )
    }
    
    function renderMyCards() {
        return (
            <View>
                {selectedCard && dummyData.myCards.map((card, index) => {
                    console.log(card.id)
                    return (
                        <CardItem 
                            key={`MyCard-${card.id}`}
                            item={card}
                            isSelected={`${selectedCard?.key}-${selectedCard?.id}
                             == MyCard-${card.id}`
                            }
                            onPress={() => setSelectedCard({...card, key: 'MyCard'})}
                        />
                    )
                })}
            </View>
        )
    }

    function renderDeliveryAddress() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                }}
            >
                <Text style={{ ...FONTS.h3 }}>Delivery Address</Text>

                <View 
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.radius,
                        paddingVertical: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                        borderWidth: 2,
                        borderRadius: SIZES.radius,
                        borderColor: COLORS.lightGray2
                    }}
                >
                    <Image 
                        source={icons.location1}
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />

                    <Text
                        style={{
                            marginLeft: SIZES.radius,
                            width: "85%",
                            ...FONTS.body3
                        }}
                    >
                        300 Post Street San Francisco, CA
                    </Text>
                </View>
            </View>
        )
    }

    function renderCoupon() {
        return (
            <View 
                style={{
                    marginTop: SIZES.radius
                }}
            >
                <Text style={{ ...FONTS.h3 }}>Add Coupon</Text>

                <CardInput 
                    inputContainerStyle={{
                        marginTop: 0,
                        paddingLegt: SIZES.padding,
                        paddingRight: 0,
                        borderWidth: 2,
                        borderColor: COLORS.lightGray2,
                        backgroundColor: COLORS.white,
                        overflow: 'hidden'
                    }}
                    placeholder="Coupon Code"
                    appendConponent={
                        <View
                            style={{
                                width: 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.primary
                            }}
                        >
                            <Image 
                                source={icons.discount}
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                            />
                        </View>
                    }
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
            <KeyboardAwareScrollView
                keyboardDismissMode='on-drag'
                extraScrollHeight={-200}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 20
                }}
            >
                {/* My Cards */}
                {renderMyCards()}

                {/* Delivery address section */}
                {renderDeliveryAddress()}

                {/* Coupon */}
                {renderCoupon()}
            </KeyboardAwareScrollView>

            <FooterTotal 
                subTotal={37.97}
                shippingFee={0.00}
                total={37.97}
                onPress={() => navigation.replace("Success")}
            />
        </View>
    )
}

export default Checkout;