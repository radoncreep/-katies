import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';

import { Header, IconButton, TextButton } from '../../components';
import CardItem from '../../components/CardItem';
import { FONTS, COLORS, SIZES, icons, dummyData } from '../../constants';

const CardsScreen = ({  navigation }) => {

    const [ selectedCard, setSelectedCard ] = useState(null);

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
                title="Cards"
                titleStyle={{
                    ...FONTS.h2,
                }}
            />
        )
    }

    function renderCards() {
        return (
            <View>
                {dummyData.myCards.map((card, index) => {
                    return (
                        <CardItem 
                            keys={`MyCard-${card.id}`}
                            isSelected={`${selectedCard?.key}-${selectedCard?.id}` == `MyCard-${card.id}`}
                            item={card}
                            onPress={() => setSelectedCard(
                                {...card, key: "MyCard"}
                            )}
                        />
                    )})
                }
            </View>
        );
    }

    function renderAddNewCard() {
        return (
            <View 
                style={{
                    marginTop: SIZES.padding,
                }}
            >
                <Text style={{ ...FONTS.h3}}>Add New Card</Text>

                {dummyData.allCards.map((newCard, index) => {
                    return (
                        <CardItem 
                            key={`NewCard-${newCard.id}`}
                            item={newCard}
                            isSelected={`${selectedCard?.key}-${selectedCard?.id}`
                                == `NewCard-${newCard.id}`
                            }
                            onPress={() => setSelectedCard({ ...newCard, key: "NewCard" })}
                        />
                    )
                })}
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
                    disabled={selectedCard == null}
                    buttonContainerStyle={{
                        height: 60,
                        borderRadius: SIZES.radius,
                        backgroundColor: selectedCard ? COLORS.primary : COLORS.gray
                    }}
                    label={selectedCard?.key == "NewCard" ? "Add Card" : "Place Your Order"}
                    onPress={() => {
                        if (selectedCard?.key == "NewCard") {
                            navigation.navigate("AddCard", {
                                selectedCard
                            });
                        } else {
                            navigation.navigate("Checkout", {
                                selectedCard
                            })
                        }
                    }}
                />
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            {/* Header section */}
            {renderHeader()}

            {/* Cards */}
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding
                }}
            >
                {renderCards()}

                {/* add new card */}
                {renderAddNewCard()}

            </ScrollView>

            {/* Footer section */}
            {renderFooter()}
        </View>
    )
}

export default CardsScreen;