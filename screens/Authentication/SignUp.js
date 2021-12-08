import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { FormInput, TextButton, TextIconButton } from '../../components';

import { FONTS, SIZES, COLORS, icons } from '../../constants';
import { formValidation } from '../../utils';
import AuthLayout from './AuthLayout';

const SignUp = ({ navigation }) => {
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showPassword, setShowPassword ] = useState("");

    // error state
    const [ emailError, setEmailError ] = useState("");
    const [ usernameError, setUsernameError ]= useState("");
    const [ passwordError, setPasswordError ] = useState("");

    const { 
        isValidEmail, 
        validateEmail, 
        validatePassword 
    } = formValidation;

    function isEnabledSignUp() {
        return email != "" && username != "" && password != "" &&
            emailError == "" && passwordError == "" && usernameError == "";
    }


    return (
        <AuthLayout
            title="Getting Started"
            subTitle="Create an account to continue!"
            titleContainerStyle={{
                marginTop: SIZES.radius
            }}
        >
            {/* Form input and sign up section */}
            <View
                style={{
                    flex: 1,
                    marginTop: SIZES.padding
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

                <FormInput 
                    label="Username"
                    containerStyle={{
                        marginTop: SIZES.radius,
                    }}
                    onChange={(value) => {
                        setUsername(value)
                    }}
                    errorMsg={usernameError}
                    appendComponent={
                        <View
                            style={{
                                justifyContent: "center"
                            }}
                        >
                            {username == "" || (username !== "" && usernameError == "") ? (
                                <Image 
                                    source={icons.correct}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        tintColor: username == "" ? COLORS.gray : (username != "" && 
                                            usernameError == "") ? COLORS.green : COLORS.red
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
                    errorMsg={passwordError}
                    appendComponent={
                        <TouchableOpacity
                            style={{
                                width: 40,
                                alignItems: "flex-end",
                                justifyContent: "center"
                            }}
                            onPress={(value) => {
                                validatePassword(value, setPasswordError)
                                setShowPassword(!showPassword)
                            }}
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

                {/* Sign up and sign in section */}
                <TextButton 
                    label="Sign Up"
                    disabled={!isEnabledSignUp()}
                    buttonContainerStyle={{
                        height: 55,
                        alignItems: "center",
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: isEnabledSignUp() ? COLORS.primary : COLORS.transparentPrimary
                    }}
                    onPress={() => navigation.navigate("Otp")}
                />

                <View
                    style={{
                        flexDirection: "row",
                        marginTop: SIZES.radius,
                        justifyContent: "center"
                    }}
                >
                    <Text 
                        style={{ 
                            color: COLORS.darkGray2,
                            ...FONTS.body3
                        }}
                    >
                        Already have an account?
                    </Text>
                    <TextButton 
                        label="Sign In"
                        buttonContainerStyle={{
                            backgroundColor: null,
                            marginLeft: SIZES.base
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                {/* Footer Section */}
                {/* facebook login button */}
                <View style={{ marginTop: SIZES.padding }}>
                    <TextIconButton 
                        containerStyle={{
                            height: 50, 
                            alignItems: "center",
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.blue
                        }}
                        icon={icons.fb}
                        iconPosition="LEFT"
                        iconStyle={{
                            tintColor: COLORS.white
                        }}
                        label="Continue With Facebook"
                        labelStyle={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white
                        }}
                        onPress={() => console.log("Fb")}
                    />

                    {/* Google login button */}
                    <TextIconButton 
                        containerStyle={{
                            height: 50, 
                            alignItems: "center",
                            marginVertical: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2
                        }}
                        icon={icons.google}
                        iconPosition="LEFT"
                        label="Continue With Google"
                        labelStyle={{
                            marginLeft: SIZES.radius,
                        }}
                        onPress={() => console.log("Fb")}
                    />
                </View>
            </View>


        </AuthLayout>
    )
}

export default SignUp;