import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Swipeable } from 'react-native-gesture-handler';

import { CartQuantityButton, FooterTotal, Header, IconButton, StepperInput } from '../../components';
import { FONTS, SIZES, COLORS, icons, dummyData } from '../../constants';

const CartTab = ({ navigation }) => {
    const [ myCartList, setMyCartList ] = useState(dummyData.myCart);

    // handlers
    function updateQuantityHandler(newQty, id) {

        const newMyCartList = myCartList.map((cartItem) => (
            cartItem.id === id ? { ...cartItem, qty: newQty } : cartItem
        ))

        setMyCartList(newMyCartList);
    }

    function removeItemFromCartHandler(id) {
        let newMyCartList = [...myCartList];

        const index = newMyCartList.findIndex((cart) => cart.id === id);

        newMyCartList.splice(index, 1);

        setMyCartList(newMyCartList);
    }

    // renders
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
                    <CartQuantityButton 
                        quantity={3}
                    />
                }
                title="Cart"
                titleStyle={{
                    ...FONTS.h2,
                }}
            />
        )
    }

    function renderCartList() {
        return (
            <SwipeListView 
                data={myCartList}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding * 2
                }}
                disableRightSwipe={true}
                rightOpenValue={-75}
                renderItem={(data, rowMap) => (
                    <View
                        style={{
                            height: 100,
                            backgroundColor: COLORS.lightGray2,
                            ...styles.cartItemContainer
                        }}
                    >
                        {/* Food Image */}
                        <View
                            style={{
                                width: 90,
                                height: 90,
                                marginLeft: -10
                            }}
                        >
                            <Image 
                                source={data.item.image}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 10
                                }}
                            />
                        </View>

                        {/* Fooo Info */}
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...FONTS.body3 }}>
                                {data.item.name}
                            </Text>
                            <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
                                ${data.item.price}
                            </Text>
                        </View>

                        {/* quantity */}
                        <StepperInput 
                            containerStyle={{
                                height: 50,
                                width: 125,
                                backgroundColor: COLORS.white
                            }}
                            value={data.item.qty}
                            onAdd={() => updateQuantityHandler(data.item.qty + 1, data.item.id )}
                            onMinus={() => {
                                if (data.item.qty > 1) {
                                    updateQuantityHandler(
                                        data.item.qty - 1, 
                                        data.item.id
                                    );
                                }
                            }}
                        />
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => {
                    <IconButton 
                        containerStyle={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor: COLORS.primary,
                            ...styles.cartItemContainer
                        }}
                        icon={icons.delete_icon}
                        iconStyle={{
                            marginRight: 10
                        }}
                        onPress={() => removeItemFromCartHandler(data.item.id)}
                    />
                }}
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

            {/* Cart List */}
            {renderCartList()}


            {/* Footer section */}
            <FooterTotal
                subTotal={27.90}
                shippingFee={0.00}
                total={37.97}
                onPress={() => navigation.navigate("CardsScreen")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius
    }
})

export default CartTab;