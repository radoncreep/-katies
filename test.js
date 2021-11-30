import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    StyleSheet
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming
}
 from 'react-native-reanimated';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import {
    Home,
    Search,
    CartTab,
    Favourite,
    Notification
} from "../screens";
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    constants,
    dummyData
} from "../constants";
import setSelectedTab from '../stores/tab/tabActions';
import { Header } from '../components';

const TabButton = ({ label, icon, isFocused, innerContainerStyle, outerContainerStyle, onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={[tabButtonStyle.outerView, { outerContainerStyle }]}>
            <Animated.View style={[tabButtonStyle.innerView, { innerContainerStyle }]}>
                <Image 
                    source={icon}
                    style={tabButtonStyle.tabIconStyle}
                />

                {isFocused && 
                    <Text
                        numberOfLines={1}
                        style={{
                            marginLeft: SIZES.base,
                            color: COLORS.gray,
                            ...FONTS.h3
                        }}
                    >
                        {label}
                    </Text>
                }
            </Animated.View>
        </Animated.View>
    </TouchableWithoutFeedback>
)

const MainLayout = ({ drawerAnimationStyle, navigation, selectedTab, setSelectedTab }) => {
    const tabLabels =  ["home", "search", "cart", "favourite", "notification"];
    const tabNames = Object.keys(constants.screens).filter((tabName) => tabLabels.includes(tabName));

    // Reanaimted Animated Value
    const tabIconTabFlex = useSharedValue(1);
    const tabIconTabColor = useSharedValue(COLORS.white);

    // Reanimated Animated Style
    const tabIconFlexStyle = useAnimatedStyle(() => {
        return {
            flex: tabIconTabFlex.value
        }
    })

    const tabIconColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: tabIconTabColor.value
        }
    })

    useEffect(() => {
        setSelectedTab(constants.screens.home);
    }, []);

    useEffect(() => {
        tabIconTabFlex.value = withTiming(1, { duration: 500 })
        tabIconTabColor.value = withTiming(COLORS.white, { duration: 500 })
    }, [selectedTab]);

    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                ...drawerAnimationStyle
            }}
        >
            {/* Header */}
            <Header
                containerStyle={headerStyle.container}
                title={selectedTab.toUpperCase()}
                leftComponent={
                    <TouchableOpacity
                        style={headerStyle.leftComponentStyle}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image source={icons.menu}/>
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity
                        style={headerStyle.rightComponentStyle}
                        onPress={() => console.log('hi')}
                    >
                        <Image 
                            source={dummyData?.myProfile?.profile_image}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: SIZES.radius
                            }}
                        />
                    </TouchableOpacity>
                }
            />

            {/* Content */}
            <View style={{ flex: 1 }}>
                <Text>MainLayout</Text>
            </View>
            

            {/* Footer */}
            <View style={headerStyle.footerStyle}>
                {/* Shadow */}
                <LinearGradient
                    start={{ x: 0, y: 0}}
                    end={{ x: 0, y: 4}}
                    colors={[ COLORS.transparent, COLORS.lightGray1 ]}
                    style={headerStyle.footerShadow}
                />

                {/* tabs */}
                <Animated.View style={headerStyle.tabsStyle}>
                    { tabNames.map((tabName, index) => (
                        <TabButton
                            key={tabName}
                            label={tabName}
                            icon={icons[tabName] || icons.cart}
                            isFocused={selectedTab === tabName}
                            outerContainerStyle={tabIconFlexStyle}
                            innerContainerStyle={tabIconColorStyle}
                            onPress={() => setSelectedTab(tabName)}
                        />
                    ))}
                </Animated.View>
            </View>
        </Animated.View>
    )
}

const tabButtonStyle = StyleSheet.create({
    innerView: {
        flexDirection: 'row',
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    outerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabIconStyle: {
        width: 20, 
        height: 20,
        tintColor: COLORS.gray
    }
})

const headerStyle = StyleSheet.create({
    container: {
        height: 50,
        paddingHorizontal: SIZES.padding,
        marginTop: 10,
        alignItems: 'center'
    },
    footerShadow: {
        position: 'absolute',
        top: -20,
        left: 0,
        right: 0,
        height: 100,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    footerStyle: {
        height: 70,
        justifyContent: 'flex-end',
    },
    leftComponentStyle: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: SIZES.radius
    },
    rightComponentStyle: {
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabsStyle: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: SIZES.radius,
        paddingBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.white
    }
})

function mapStateToProps(state) {
    return {
        selectedTab: state.tabReducer.selectedTab
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedTab: (selectedTab) => dispatch(setSelectedTab(selectedTab))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);