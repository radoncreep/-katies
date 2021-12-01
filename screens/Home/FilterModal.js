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

import { COLORS, FONTS, SIZES, constants, icons } from '../../constants';

const FilterModal = ({ isVisible, onClose }) => {
    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

    const [ showFilterModal, setShowFilterModal ] = useState(isVisible);

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
    })

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