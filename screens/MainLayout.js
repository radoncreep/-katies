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
        <Animated.View style={[tabButtonStyle.outerView, outerContainerStyle ]}>
            <Animated.View style={[tabButtonStyle.innerView, innerContainerStyle ]}>
                <Image 
                    source={icon}
                    style={[
                        tabButtonStyle.tabIconStyle, 
                        { tintColor: isFocused ? COLORS.white : COLORS.gray }
                    ]}
                />

                {isFocused && 
                    <Text
                        numberOfLines={1}
                        style={{
                            marginLeft: SIZES.base,
                            color: isFocused ? COLORS.white : COLORS.gray,
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
    const flatListRef = React.useRef();

    // Reanaimted Animated Value
    const homeTabFlex = useSharedValue(1);
    const homeTabColor = useSharedValue(COLORS.white);
    const searchTabFlex = useSharedValue(1);
    const searchTabColor = useSharedValue(COLORS.white);
    const cartTabFlex = useSharedValue(1);
    const cartTabColor = useSharedValue(COLORS.white);
    const favouriteTabFlex = useSharedValue(1);
    const favouriteTabColor = useSharedValue(COLORS.white);
    const notificationTabFlex = useSharedValue(1);
    const notificationTabColor = useSharedValue(COLORS.white);

    // Reanimated Animated Style
    const homeTabFlexStyle = useAnimatedStyle(() => {
        return {
            flex: homeTabFlex.value
        }
    })

    const homeColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: homeTabColor.value
        }
    })

    const searchTabFlexStyle = useAnimatedStyle(() => {
        return {
            flex: searchTabFlex.value
        }
    })

    const searchColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: searchTabColor.value
        }
    })

    const cartTabFlexStyle = useAnimatedStyle(() => {
        return {
            flex: cartTabFlex.value
        }
    })

    const cartColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: cartTabColor.value
        }
    })

    const favouriteTabFlexStyle = useAnimatedStyle(() => {
        return {
            flex: favouriteTabFlex.value
        }
    })

    const favouriteColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: favouriteTabColor.value
        }
    })

    const notificationTabFlexStyle = useAnimatedStyle(() => {
        return {
            flex: notificationTabFlex.value
        }
    })

    const notificationColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: notificationTabColor.value
        }
    })

    useEffect(() => {
        setSelectedTab(constants.screens.home);
    }, []);

    useEffect(() => {
        if (selectedTab === constants.screens.home) {
            flatListRef?.current?.scrollToIndex({
                index: 0,
                Animated: false
            })
            homeTabFlex.value = withTiming(4, { duration: 500 })
            homeTabColor.value = withTiming(COLORS.primary, { duration: 500 })
        } else {
            homeTabFlex.value = withTiming(1, { duration: 500 })
            homeTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab === constants.screens.search) {
            flatListRef?.current?.scrollToIndex({
                index: 1,
                Animated: false
            })
            searchTabFlex.value = withTiming(4, { duration: 500 })
            searchTabColor.value = withTiming(COLORS.primary, { duration: 500 })
        } else {
            searchTabFlex.value = withTiming(1, { duration: 500 })
            searchTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab === constants.screens.cart) {
            flatListRef?.current?.scrollToIndex({
                index: 2,
                Animated: false
            })
            cartTabFlex.value = withTiming(4, { duration: 500 })
            cartTabColor.value = withTiming(COLORS.primary, { duration: 500 })
        } else {
            cartTabFlex.value = withTiming(1, { duration: 500 })
            cartTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab === constants.screens.favourite) {
            flatListRef?.current?.scrollToIndex({
                index: 3,
                Animated: false
            })
            favouriteTabFlex.value = withTiming(4, { duration: 500 })
            favouriteTabColor.value = withTiming(COLORS.primary, { duration: 500 })
        } else {
            favouriteTabFlex.value = withTiming(1, { duration: 500 })
            favouriteTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab === constants.screens.notification) {
            flatListRef?.current?.scrollToIndex({
                index: 4,
                Animated: false
            })
            notificationTabFlex.value = withTiming(4, { duration: 500 })
            notificationTabColor.value = withTiming(COLORS.primary, { duration: 500 })
        } else {
            notificationTabFlex.value = withTiming(1, { duration: 500 })
            notificationTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }
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
                <FlatList
                    ref={flatListRef}
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item, index }) => (
                        <View style={{ height: SIZES.height, width: SIZES.width }}>
                            {item.label === constants.screens.home && <Home />}
                            {item.label === constants.screens.search && <Search />}
                            {item.label === constants.screens.cart && <CartTab />}
                            {item.label === constants.screens.favourite && <Favourite />}
                            {item.label === constants.screens.notification && <Notification />}
                        </View>
                    )}
                />
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
                    <TabButton
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab === constants.screens.home}
                        outerContainerStyle={homeTabFlexStyle}
                        innerContainerStyle={homeColorStyle}
                        onPress={() => setSelectedTab(constants.screens.home)}
                    />
                    <TabButton
                        label={constants.screens.search}
                        icon={icons.search}
                        isFocused={selectedTab === constants.screens.search}
                        outerContainerStyle={searchTabFlexStyle}
                        innerContainerStyle={searchColorStyle}
                        onPress={() => setSelectedTab(constants.screens.search)}
                    />
                    <TabButton
                        label={constants.screens.cart}
                        icon={icons.cart}
                        isFocused={selectedTab === constants.screens.cart}
                        outerContainerStyle={cartTabFlexStyle}
                        innerContainerStyle={cartColorStyle}
                        onPress={() => setSelectedTab(constants.screens.cart)}
                    />
                    <TabButton
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                        isFocused={selectedTab === constants.screens.favourite}
                        outerContainerStyle={favouriteTabFlexStyle}
                        innerContainerStyle={favouriteColorStyle}
                        onPress={() => setSelectedTab(constants.screens.favourite)}
                    />
                    <TabButton
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab === constants.screens.notification}
                        outerContainerStyle={notificationTabFlexStyle}
                        innerContainerStyle={notificationColorStyle}
                        onPress={() => setSelectedTab(constants.screens.notification)}
                    />
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