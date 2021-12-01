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
import { HorizontalFoodCard } from '../../components';

import{
    FONTS,
    SIZES,
    COLORS,
    icons,
    dummyData
} from '../../constants';

const Home = () => {
    const [ selectedCategoryId, setSelectedCategoryId ] = useState(1);
    const [ selectedMenuType, setSelectedMenuType ] = useState(1);
    const [ menuList, setMenuList ] = useState([]);

    useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType);
    }, [])

    function handleChangeCategory(categoryId, menuTypeId) {
        // find the menu base on the menuTypeId
        let selectedMenu = dummyData.menu.find(({ id }) => id == menuTypeId);

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