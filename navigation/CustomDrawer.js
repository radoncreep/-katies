import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView
} from '@react-navigation/drawer';
import { connect } from "react-redux";
import setSelectedTab from "../stores/tab/tabActions";

import { MainLayout } from '../screens';
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    dummyData,
} from "../constants";
import Animated from 'react-native-reanimated';

// the function returns a component making Drawer const a component
const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
    console.log(onPress)
    return (
        <TouchableOpacity
            style={[
                customDrawerItemStyles.container,
                { backgroundColor: isFocused ? COLORS.transparentBlack1 : null }
            ]}
            onPress={onPress}
        >
            <Image 
                source={icon}
                style={customDrawerItemStyles.imageIcon}
            />

            <Text style={customDrawerItemStyles.labelText}>{label}</Text>
        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab }) => {
    const screenKeys = Object.keys(constants.screens);
    const screenValue = Object.values(constants.screens);

    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{ flex: 1 }}
        >
            <View
                style={customDrawerContentStyles.container}
            >
                {/* Close Button */}
                <View style={customDrawerContentStyles.closeButtonContainer}>
                    <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => navigation.closeDrawer()}
                    >
                        <Image
                            source={icons.cross}
                            style={customDrawerContentStyles.closeButtonIcon}
                        />
                    </TouchableOpacity>
                </View>

                {/* Profile */}
                <TouchableOpacity 
                    style={customDrawerContentStyles.profile}
                    onPress={() => console.log('profile')}
                >
                    <Image 
                        source={dummyData.myProfile?.profile_image}
                        style={customDrawerContentStyles.profileImage}
                    />

                    <View style={{ marginLeft: SIZES.radius }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{dummyData.myProfile?.name}</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>View your profile</Text>
                    </View>
                </TouchableOpacity>

                {/* Drawer Items */}
                <View style={customDrawerContentStyles.drawerItemsContainer}>
                    {screenValue.map((screenName, index) => (
                        <View key={index}>
                            { (screenName === 'Home' ||
                              screenName === 'My Wallet' ||
                              screenName === 'Notification' ||
                              screenName === 'Favourite') && 
                                <CustomDrawerItem
                                    label={screenName}
                                    icon={icons[screenKeys[index]]}
                                    isFocused={selectedTab === screenName}
                                    onPress={() => {
                                        setSelectedTab(screenName);
                                        navigation.navigate(screenName === "Home" ? "MainLayout" :  screenName);
                                    }}
                                />
                            }
                        </View>
                    ))}

                    <View style={customDrawerItemStyles.lineBreak}/>

                    {constants.bottomDrawerItems.map(({label, iconName}, index) => (
                        <CustomDrawerItem
                            key={label}
                            label={label}
                            icon={icons[iconName]}
                            isFocused={selectedTab === label}
                            onPress={() => {
                                setSelectedTab(label);
                                navigation.navigate(label);
                            }}
                        />
                    ))}
                </View>

                <View style={{ marginBottom: SIZES.padding }}>
                    <CustomDrawerItem 
                        label="Logout"
                        icon={icons.logout}
                        isFocused={selectedTab === 'Logout'}
                        onPress={() => {
                            setSelectedTab('Logout');
                            navigation.navigate('Logout');
                        }}
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
    const [ progress, setProgress ] = React.useState(new Animated.Value(0));

    // screen scaling animation
    const scale = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8]
    });

    const borderRadius = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 26]
    });

    const animatedStyle = { borderRadius, transform: [{ scale }] };

    return (
        <View style={customDrawerStyles.container}>
            <Drawer.Navigator
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={customDrawerStyles.drawerBody}
                sceneContainerStyle={{
                    backgroundColor: 'transparent'
                }}
                initialRouteName="MainLayout"
                drawerContent={(props) => {
                    setTimeout(() => {
                        setProgress(props.progress);
                    }, 0);
                    
                    return (
                        <CustomDrawerContent 
                            navigation={props.navigation}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                        />
                    )
                }}
            >
                <Drawer.Screen name="MainLayout">
                    { props => <MainLayout {...props} drawerAnimationStyle={animatedStyle} /> }
                </Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
}

const customDrawerItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        marginBottom: SIZES.base,
        alignItems: 'center',
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.base
    },
    imageIcon: {
        width: 20,
        height: 20,
        tintColor: COLORS.white
    },
    labelText: {
        marginLeft: 15,
        color: COLORS.white,
        ...FONTS.h3
    },
    lineBreak: {
        height: 1,
        marginVertical: SIZES.radius,
        marginLeft: SIZES.radius,
        backgroundColor: COLORS.lightGray1
    }
})

const customDrawerContentStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.radius
    },
    closeButtonContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    closeButtonIcon: {
        height: 35, 
        width: 35,
        tintColor: COLORS.white
    },
    profile: {
        flexDirection: 'row',
        marginTop: SIZES.radius,
        alignItems: 'center'
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: SIZES.radius
    },
    drawerItemsContainer: {
        flex: 1,
        marginTop: SIZES.padding
    }
})

const customDrawerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    closeButtonContainer: {

    },
    drawerBody: {
        flex: 1,
        width: '65%',
        paddingRight: 20,
        backgroundColor: 'transparent'
    }
})

function mapStateToProps(state) {
    return {
        selectedTab: state.tabReducer.selectedTab
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedTab: (selectedTab) => {
            return dispatch(setSelectedTab(selectedTab))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);