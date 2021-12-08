import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { MdOutlineCancel } from 'react-icons/md'; 
import { ImCancelCircle } from 'react-icons/im';

import AuthLayout from './AuthLayout';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { CustomSwitch, FormInput, TextButton } from '../../components';
import { emailValidation } from '../../utils';

const SignIn = ({ navigation }) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ emailError, setEmailError ] = useState("");

    const [ showPassword, setShowPassword ] = useState(false);
    const [ saveMe, setSaveMe ] = useState(false);

    const { 
        isValidEmail, 
        validateEmail, 
        validatePassword 
    } = emailValidation;

    return (
        <AuthLayout 
            title="Let's Sign You In"
            subTitle="Welcome back, you've been missed"
        >
            <View
                style={{
                    flex: 1,
                    marginTop: SIZES.padding * 2,
                }}
            >
                {/* Form Inputs */}
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

                <FormInput
                    label="Password"
                    secureTextEntry={!showPassword}
                    autoCompleteType="password"
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value) => setPassword(value)}
                    appendComponent={
                        <TouchableOpacity
                            style={{
                                width: 40,
                                alignItems: "flex-end",
                                justifyContent: "center"
                            }}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Image 
                                source={showPassword ? icons.eye : icons.eye_close}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.gray
                                }}
                            />
                        </TouchableOpacity>
                    }
                />

                {/* Save me and Forgot Password */}
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: SIZES.radius,
                        justifyContent: "space-between"
                    }}
                >
                    {/* Switcch to save pwd */}
                    <CustomSwitch 
                        value={saveMe}
                        onChange={(value) => setSaveMe(value)}
                    />

                    {/* text */}
                    <TextButton 
                        label="Forgot Password?"
                        buttonContainerStyle={{
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.gray,
                            ...FONTS.body4
                        }}
                        onPress={() => navigation.navigate("ForgotPassword")}
                    />
                </View>

                {/* SignIn */}

                {/* Sing up */}
            </View>

        </AuthLayout>
    )
}

export default SignIn;