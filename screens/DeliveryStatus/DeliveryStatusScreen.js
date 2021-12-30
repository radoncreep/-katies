import React, { useState } from 'react'
import { 
    View, 
    Text, 
    Image,
    ScrollView 
} from 'react-native';
import { Header, LineDivider, TextButton, TextIconButton } from '../../components';
import { COLORS, constants, FONTS, icons, SIZES } from '../../constants';

const DeliveryStatusScreen = ({ navigation }) => {

    const [ currentStep, setCurrentStep ] = useState(2);
    
    function renderHeader() {
        return (
            <Header 
                title="DELIVERY STATUS"
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 10
                }}
            />
        )
    }

    function renderInfo() {
        return (
            <View
                style={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: COLORS.gray,
                        ...FONTS.body4
                    }}
                >
                    Estimated Delivery
                </Text>
                <Text style={{ textAlign: 'center', ...FONTS.h2 }}>
                    30 Dec 2021 / 8:20 AM
                </Text>
            </View>
        )
    }

    function renderTrackOrder() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    borderRadius: SIZES.radius,
                    borderWidth: 2,
                    borderColor: COLORS.lightGray2,
                    backgroundColor: COLORS.white2,
                    paddingVertical: SIZES.radius
                }}
            >
                {/* Track Order */}
                <View 
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                        paddingHorizontal: SIZES.base
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>Track Order</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                        {/* Location abbreviation numbers */}
                        LK2810854 
                    </Text>
                </View>

                <LineDivider 
                    lineStyle={{
                        backgroundColor: COLORS.lightGray2
                    }}
                />

                {/* Status */}
                <View
                    style={{
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    {constants.track_order_status.map((item, index) => {
                        return (
                            <View
                                key={`StatusList-${index}`}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical: -5
                                    }}
                                >
                                    <Image 
                                        source={icons.check_circle}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            tintColor: index <= currentStep ? COLORS.primary : COLORS.lightGray1
                                        }}
                                    />

                                    <View style={{ marginLeft: SIZES.radius }}>
                                        <Text style={{ ...FONTS.h3 }}>{item.title}</Text>
                                        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                                            {item.sub_title}
                                        </Text>
                                    </View>
                                </View>

                                {index < constants.track_order_status.length - 1 
                                 && (
                                    <View>
                                        {index < currentStep && (
                                            <View
                                                style={{
                                                    height: 50,
                                                    width: 4,
                                                    marginLeft: 18,
                                                    backgroundColor: COLORS.primary,
                                                    zIndex: -1
                                                }}
                                            />
                                        )}

                                        {index >= currentStep && (
                                            <Image 
                                                source={icons.dotted_line}
                                                resizeMode="cover"
                                                style={{
                                                    width: 4,
                                                    height: 50,
                                                    marginLeft: 17
                                                }}
                                            />
                                        )}
                                    </View>
                                 )
                                }
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    marginTop: SIZES.radius,
                    marginBottom: SIZES.padding,
                }}
            >
                {currentStep < constants.track_order_status.length - 1 && (
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 55,
                        }}
                    >
                        {/* Cancel Button */}
                        <TextButton 
                            buttonContainerStyle={{
                                width: "40%",
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.lightGray2,
                            }}
                            label="Cancel"
                            labelStyle={{
                                color: COLORS.primary
                            }}
                            onPress={() => navigation.navigate("FoodDetails")}
                        />

                        {/* MapView Button */}
                        <TextIconButton 
                            containerStyle={{
                                flex: 1,
                                marginRight: SIZES.base,
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.primary
                            }}
                            label="Map View"
                            labelStyle={{
                                color: COLORS.white,
                                ...FONTS.h3
                            }}
                            icon={icons.map}
                            iconPosition="LEFT"
                            iconStyle={{
                                width: 25,
                                height: 25,
                                marginRight: SIZES.base,
                                tintColor: COLORS.white
                            }}
                            onPress={() => navigation.navigate("MapView")}
                        />
                    </View>
                )}

                {currentStep == constants.track_order_status.length - 1 && (
                    <TextButton 
                        buttonContainerStyle={{
                            height: 55,
                            borderRadius: SIZES.base
                        }}
                        label="DONE"
                        onPress={() => navigation.navigate("FoodDetails")}
                    />
                )}
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
                backgroundColor: COLORS.white
            }}
        >

            {/* Header */}
            {renderHeader()}

            {/* Info */}
            {renderInfo()}

            {/* Track Order */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderTrackOrder()}
            </ScrollView>

            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

export default DeliveryStatusScreen;