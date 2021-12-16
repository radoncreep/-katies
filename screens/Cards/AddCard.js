import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FONTS, COLORS, SIZES, icons, images } from "../../constants";
import { 
    CardInput, 
    CardInputCheck, 
    Header, 
    IconButton, 
    RadioButton, 
    TextButton 
} from '../../components';
import { validateInput } from '../../utils/cardInputValidation';


const AddCardScreen = ({  navigation, route }) => {

    const [ selectedCard, setSelectedCard ] = useState(null);

    const [ cardNumber, setCardNumber ] = useState("");
    const [ cardNumberErr, setCardNumberErr ] = useState("");

    const [ cardName, setCardName ] = useState("");
    const [ cardNameError, setCardNameError ] = useState("");

    const [ expiryDate, setExpiryDate ] = useState("");
    const [ expiryDateError, setExpiryDateError ] = useState("");

    const [ cvv, setCvv ] = useState("");
    const [ cvvError, setCvvError ] = useState("");

    const [ isRemember, setIsRemember ] = useState(false);

    useEffect(() => {
        let { selectedCard } = route.params;

        setSelectedCard(selectedCard);
    }, []);

    function isEnableAddCard() {
        return cardNumber != "" && cardName != + "" && expiryDate !== "" && cvv !== ""
            && cardNumberErr == "" && cardNameError == "" && expiryDateError == "" && cvvError == "";

    }

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
                title="ADD NEW CARD"
                titleStyle={{
                    ...FONTS.h2,
                    fontSize: 20
                }}
            />
        )
    }

    function renderCardImage() {
        return (
            <ImageBackground
                source={images.card}
                style={{
                    height: 200,
                    width: "100%",
                    marginTop: SIZES.radius,
                    borderRadius: SIZES.radius,
                    overflow: "hidden"
                }}
            >
                {/* Logo */}
                <Image 
                    source={selectedCard?.icon}
                    resizeMode='contain'
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        height: 40,
                        width: 80
                    }}
                />

                {/* Detail */}
                <View 
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        right: 0,
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    {/* Card name */}
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                        {cardName ? cardName : "card name"}
                    </Text>

                    <View 
                        style={{ 
                            flexDirection: 'row'
                        }}
                    >
                        <Text 
                            style={{ 
                                flex: 1, 
                                color: COLORS.white, 
                                ...FONTS.h3 
                            }}
                        >
                            {cardNumber ? cardNumber : "card number"}
                        </Text>

                        <Text 
                            style={{ 
                                color: COLORS.white, 
                                ...FONTS.h3 
                            }}
                        >
                            {expiryDate ? expiryDate : "exp"}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 2,
                }}
            >
                {/* Card Number */}
                <CardInput 
                    label="Card Number"
                    keyboardType="number-pad"
                    value={cardNumber}
                    maxLength={19}
                    onChange={(value) => {
                        setCardNumber(value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim());
                        validateInput(value, 19, setCardNumberErr);
                    }}
                    errorMsg={cardNumberErr}
                    appendConponent={
                        <CardInputCheck 
                            value={cardNumber}
                            error={cardNumberErr}
                        />
                    }
                />

                {/* Card Name */}
                <CardInput 
                    label="CardHolder Name"
                    value={cardName}
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value) => {
                        validateInput(value, 1, setCardNameError);
                        setCardName(value)
                    }}
                    errorMsg={cardNameError}
                    appendConponent={
                        <CardInputCheck 
                            value={cardName}
                            error={cardNameError}
                        />
                    }
                />

                    {/* expiry and cvv */}
                <View 
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius
                    }}
                >
                    <CardInput 
                        label="Expiry Date"
                        value={expiryDate}
                        placeholder="MM/YY"
                        maxLength={5}
                        containerStyle={{
                            flex: 1
                        }}
                        onChange={(value) => {
                            validateInput(value, 5, setExpiryDateError);
                            setExpiryDate(value)
                        }}
                        appendConponent={
                            <CardInputCheck 
                                value={expiryDate}
                                error={expiryDateError}
                            />
                        }
                    />

                    <CardInput 
                        label="CVV"
                        value={cvv}
                        placeholder="000"
                        maxLength={3}
                        containerStyle={{
                            flex: 1,
                            marginLeft: SIZES.radius
                        }}
                        onChange={(value) => {
                            validateInput(value, 3, setCvvError);
                            setCvv(value)
                        }}
                        appendConponent={
                            <CardInputCheck 
                                value={cvv}
                                error={cvvError}
                            />
                        }
                    />
                </View>

                {/* Remember section */}
                <View
                    style={{
                        alignItems: 'flex-start',
                        marginTop: SIZES.padding
                    }}
                >
                    <RadioButton 
                        label="Remember this card datails"
                        isSelected={isRemember}
                        onPress={() => setIsRemember(!isRemember)}
                    />
                </View>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View 
                style={{
                    paddingTop: SIZES.radius,
                    paddingBottom: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <TextButton 
                    label="Add Card"
                    disabled={!isEnableAddCard()}
                    buttonContainerStyle={{
                        height: 60,
                        borderRadius: SIZES.radius,
                        backgroundColor: isEnableAddCard() ? COLORS.primary :
                            COLORS.transparentPrimary
                    }}
                    onPress={() => navigation.goBack()}
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
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* Card Image */}
                {renderCardImage()}

                {/* Forms */}
                {renderForm()}
            </KeyboardAwareScrollView>

            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

export default AddCardScreen;