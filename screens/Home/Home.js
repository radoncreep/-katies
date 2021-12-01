import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    StyleSheet
} from 'react-native';
import { 
    HorizontalFoodCard, 
    VerticalFoodCard 
} from '../../components';

import{
    FONTS,
    SIZES,
    COLORS,
    icons,
    dummyData
} from '../../constants';

const Section = ({ title, onPress, children }) => {
    return (
        <View>
            {/* Header section */}
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    marginTop: 30,
                    marginBottom: 20
                }}
            >
                <Text style={{ flex: 1, ...FONTS.h3 }}>
                    {title}
                </Text>

                <TouchableOpacity onPress={onPress}>
                    <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
                        Show All
                    </Text>
                </TouchableOpacity>
            </View>

            {/* content section */}
            {children}
        </View>
    )
}

const Home = () => {
    const [ selectedCategoryId, setSelectedCategoryId ] = useState(1);
    const [ selectedMenuType, setSelectedMenuType ] = useState(1);
    const [ menuList, setMenuList ] = useState([]);
    const [ recommends, setRecommends ] = useState([]);
    const [ popular, setPopular ] = useState([]);

    useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType);
    }, [])

    function handleChangeCategory(categoryId, menuTypeId) {
        // Retrieve the popular menu
        let selectedPopular = dummyData.menu.find(({ name } ) =>  name == "Popular");
        // Retrieve the recommended menu
        let selectedRecommend = dummyData.menu.find(({ name }) => name == "Recommended");

        // find the menu base on the menuTypeId
        let selectedMenu = dummyData.menu.find(({ id }) => id == menuTypeId);

        // Set the popular menu based on the categoryId
        setPopular(selectedPopular?.list.filter(a => a.categories.includes(categoryId)));

        // Set the recommended menu based on the categoryId
        setRecommends(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)));

        // set the menu based on the categoryId
        setMenuList(selectedMenu?.list.filter(({ categories }) =>  categories.includes(categoryId)));
    }

    // Render

    function renderSearch() {
        return (
            <View style={styles.container}>
                {/* icon/ */}
                <Image 
                    source={icons.search}
                    style={{
                        height: 15, 
                        width: 15,
                        tintColor: COLORS.black
                    }}
                />

                {/* Text input */}
                <TextInput 
                    style={{
                        flex: 1,
                        paddingVertical: 5,
                        marginLeft: SIZES.radius,
                        ...FONTS.body4
                    }}
                    placeholder="search food..."
                />

                {/* filter button */}
                <TouchableOpacity>
                    <Image 
                        source={icons.filter}
                        style={{
                            height: 15,
                            width: 15,
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderMenuTypes() {
        return (
            <FlatList 
                horizontal
                data={dummyData.menu}
                keyExtractor={(item) => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0
                        }}
                    >
                        <Text 
                            style={{
                                color: selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                                ...FONTS.h3
                            }}
                            onPress={() => { 
                                setSelectedMenuType(item.id);
                                handleChangeCategory(selectedCategoryId, item.id)
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        )
    }

    function renderRecommendedSection() {
        return (
            <Section
                title="Recommended"
                onPress={() => console.log("Show all recommended")}
            >
                <FlatList 
                    data={recommends}
                    keyExtractor={(item) => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 180,
                                width: SIZES.width * 0.85,
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                                paddingRight: SIZES.radius,
                                alignItems: 'center',
                            }}
                            imageStyle={{
                                marginTop: 35,
                                height: 150,
                                width: 150
                            }}
                            item={item}
                            onPress={() => console.log("recommended food card")}
                        />
                    )}
                />
            </Section>
        )
    }

    function renderPopularSection() {
        return (
            <Section
                title="Popular Near You"
                onPress={() => console.log("Show all popular items")}
            >
                <FlatList 
                    data={popular}
                    keyExtractor={(item) => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <VerticalFoodCard 
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : 10,
                                marginRight: index == popular.length - 1 ? SIZES.padding : 0
                            }}
                            item={item}
                            onPress={() => console.log("Popular Vertical Card")}
                        />
                    )}
                />
            </Section>
        )
    }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* Search Section */}
            {renderSearch()}

            {/* list */}
            <FlatList 
                data={menuList}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* render popular section */}
                        {renderPopularSection()}

                        {/* render recommended section */}
                        {renderRecommendedSection()}
                        
                        {/* render menu types */}
                        {renderMenuTypes()}
                    </View>
                }
                renderItem={({ item, index}) => (
                    <HorizontalFoodCard 
                        containerStyle={{
                            height: 130,
                            alignItems: 'center',
                            marginHorizontal: SIZES.padding,
                            marginBottom: SIZES.radius
                        }}
                        imageStyle={{
                            marginTop: 20,
                            height: 110,
                            width: 110
                        }}
                        item={item}
                        onPress={() => console.log("horizontal food card")}
                    />
                )}
            />
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2
    },
})