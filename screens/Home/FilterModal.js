import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Animated,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    StyleSheet
} from 'react-native';
import { IconButton, TextButton, TextIconButton, TwoPointSlider } from '../../components';

import { COLORS, FONTS, SIZES, constants, icons } from '../../constants';

const CustomModalContent = ({ containerStyle, title, children }) => {
    return (
        <View
            style={{
                marginTop: SIZES.padding,
                ...containerStyle
            }}
        >
            <Text style={{ ...FONTS.h3 }}>{title}</Text>

            {children}
        </View>
    )
}

const FilterModal = ({ isVisible, onClose }) => {
    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

    const [ showFilterModal, setShowFilterModal ] = useState(isVisible);

    const [ deliveryTime, setDeliveryTime ] = useState("");
    const [ ratings, setRatings ] = useState("");
    const [tags, setTags ] = useState("");

    useEffect(() => {
        if (showFilterModal) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start(() => onClose());
        }
    }, [ showFilterModal ]);

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 680]
    });

    function renderDistance() {
        return (
            <CustomModalContent 
                title="Distance"
            >
                <View style={{ alignItems: "center" }}>
                    <TwoPointSlider 
                        values={[3, 10]}
                        min={1}
                        max={20}
                        postfix="km"
                        onValuesChange={(values) => console.log(values)}
                    />
                </View>
            </CustomModalContent>
        )
    }

    function renderDeliveryTime() {
        return (
            <CustomModalContent
                title="Delivery Time"
                containerStyle={{
                    marginTop: 40
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: SIZES.radius
                    }}
                >
                    {constants.delivery_time.map((item, index) => {
                        return (
                            <TextButton 
                                key={`delivery_time-${index}`}
                                label={item.label}
                                labelStyle={{
                                    color: item.id == deliveryTime ? 
                                        COLORS.white : COLORS.gray,
                                    ...FONTS.body3
                                }}
                                buttonContainerStyle={{
                                    width: "30%",
                                    height: 50, 
                                    margin: 5,
                                    alignItems: 'center',
                                    borderRadius: SIZES.base,
                                    backgroundColor: item.id === deliveryTime ?
                                        COLORS.primary : COLORS.lightGray2
                                }}
                                onPress={() => setDeliveryTime(item.id)}
                            />
                        )
                    })}
                </View>
            </CustomModalContent>
        )
    }

    function renderPricingRange() {
        return (
            <CustomModalContent
                title="Pricing Range"
            >
                <View style={{ alignItems: "center" }}>
                    <TwoPointSlider 
                        values={[2, 50]}
                        min={1}
                        max={100}
                        prefix="$"
                        postfix=""
                        onValuesChange={(values) => console.log(values)}
                    />
                </View>
            </CustomModalContent>
        )
    }

    function renderRatings() {
        return (
            <CustomModalContent
                title="Ratings"
                containerStyle={{
                    marginTop: 40
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    {constants.ratings.map((item, index) => (
                        <TextIconButton 
                            key={`Ratings-${index}`}
                            containerStyle={{
                                flex: 1,
                                height: 50,
                                margin: 5,
                                alignItems: 'center',
                                borderRadius: SIZES.base,
                                backgroundColor: item.id == ratings ?
                                    COLORS.primary : COLORS.lightGray2
                            }}
                            label={item.label}
                            labelStyle={{
                                color: item.id == ratings ? 
                                    COLORS.white : COLORS.gray
                            }}
                            icon={icons.star}
                            iconStyle={{
                                tintColor: item.id == ratings ? 
                                    COLORS.white : COLORS.gray
                            }}
                            onPress={() => setRatings(item.id)}
                        />
                    ))}
                </View>
            </CustomModalContent>
        )
    }

    function renderTags() {
        return (
            <CustomModalContent
                title="Tags"
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}
                >
                    {constants.tags.map((item, index) => (
                        <TextButton 
                            key={`Tags-${index}`}
                            label={item.label}
                            labelStyle={{
                                color: item.id == tags ? 
                                    COLORS.white : COLORS.gray,
                                ...FONTS.body3
                            }}
                            buttonContainerStyle={{
                                height: 40,
                                margin: 5,
                                paddingHorizontal: SIZES.padding,
                                alignItem: 'center',
                                borderRadius: SIZES.base,
                                backgroundColor: item.id == tags ?
                                    COLORS.primary : COLORS.lightGray2
                            }}
                            onPress={() => setTags(item.id)}
                        />
                    ))}
                </View>
            </CustomModalContent>
        )
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View style={styles.modalContainer}>
                {/* Transparent background */}

                <TouchableWithoutFeedback onPress={() =>  setShowFilterModal(false)}>
                    <View style={styles.modalBody} />
                </TouchableWithoutFeedback>

                <Animated.View style={[styles.animatedView, { top: modalY }]}>
                    {/* Header */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        
                        <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>
                            Filter Your Search
                        </Text>

                        <IconButton 
                            containerStyle={{
                                borderWidth: 2, 
                                borderRadius: 10, 
                                borderColor: COLORS.gray2
                            }}
                            icon={icons.cross}
                            iconStyle={{
                                tintColor: COLORS.gray2
                            }}
                            onPress={() => setShowFilterModal(false)}
                        />
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 250
                        }}
                    >
                        {/* Distance */}
                        {renderDistance()}

                        {/* delivery time section */}
                        {renderDeliveryTime()}

                        {/* pricing range section */}
                        {renderPricingRange()}

                        {/* Ratings */}
                        {renderRatings()}

                        {/* redner tags */}
                        {renderTags()}

                        {/* Apply Button */}
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 100, 
                                left: 0,
                                right: 0,
                                height: 110,
                                paddingHorizontal: SIZES.padding,
                                paddingVertcal: SIZES.radius,
                                backgroundColor: COLORS.white,
                            }}
                        >
                            <TextButton 
                                label="Apply filters"
                                buttonContainerStyle={{ 
                                    height: 50,
                                    borderRadius: SIZES.base,
                                    backgroundColor: COLORS.primary
                                }}
                                onPress={() => console.log('Apply filter')}
                            />
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.transparentBlack7
    },
    modalBody: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    animatedView: {
        position: 'absolute',
        left: 0,
        width: "100%",
        height: "100%",
        padding: SIZES.padding,
        borderTopLeftRadius: SIZES.padding,
        borderTopRightRadius: SIZES.padding,
        backgroundColor: COLORS.white
    }
})

export default FilterModal;