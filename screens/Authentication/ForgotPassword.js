import React, { useState } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import AuthLayout from './AuthLayout';
import { FONTS, COLORS, SIZES, icons } from '../../constants';
import { FormInput, TextButton } from '../../components';
import { formValidation } from '../../utils';

const ForgotPassword = ({ navigation }) => {
    const [ email, setEmail ] = useState("");
    const [ emailError, setEmailError ] = useState("");

    const { 
        isValidEmail, 
        validateEmail, 
        validatePassword 
    } = formValidation;

    function isEnabledSendEmail() {
        return email != "" && emailError == "";
    }

    return (
        <AuthLayout
            title="Password Recovery"
            subTitle="Please enter your email address to recover your password"
            titleContainerStyle={{
                marginTop: SIZES.padding * 2
            }}
        >
            {/* Form Input Section */}
            <View
                style={{
                    flex: 1,
                    marginTop: SIZES.padding * 2
                }}
            >
                <FormInput
                    label="Email"
                    keyboardType="email-address"
                    autoCompleteType="email"
                    onChange={(value) => {
                        validateEmail(value, setEmailError)
                        setEmail(value);
                    }}
                    errorMsg={emailError}
                    appendComponent={
                        <View
                            style={{
                                justifyContent: "center"
                            }}
                        >
                            {email == "" || (email !== "" && emailError == "") ? (
                                <Image 
                                    source={icons.correct}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        tintColor: email == "" ? COLORS.gray : (email != "" && 
                                            emailError == "") ? COLORS.green : COLORS.red
                                    }}
                                />
                            ) : (
                                <Text>Cancel</Text>
                            )}
                        </View>
                    }
                />
            </View>

            {/* Button */}
            <TextButton 
                label="Send Email"
                disabled={!isEnabledSendEmail()}
                buttonContainerStyle={{
                    height: 55,
                    alignItems: "center",
                    marginVertical: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: isEnabledSendEmail() ? COLORS.primary : COLORS.transparentPrimary
                }}
                onPress={() => navigation.goBack()}
            />

        </AuthLayout>
    )
}

export default ForgotPassword;