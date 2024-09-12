import { View, Text, ImageBackground, Animated, Image, Dimensions, ScrollView, SafeAreaView, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert,Platform } from 'react-native'
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';


const LoginScreen = () => {



const route= useRoute()

console.log(route.params)
    const navigation = useNavigation();
    const [mobileNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    const [error, setErr] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [user, setUser] = useState("");
    const [flag, setFlag] = useState(false)
    const [verified, setVerified] = useState(false)
    const [focusOnName, setFocusOnName] = useState(false)
    const [focusOnNumber, setFocusOnNumber] = useState(false)




    const getNumber = async () => {
        try {
            let number = await AsyncStorage.getItem('user');
            console.log("User ID:", number);


            if (!number) {
                console.log("User ID not found in AsyncStorage");
                return; // or handle this case as appropriate
            }

            // Convert number to string before sending the request
            const userId = parseInt(number.replace(/\D/g, ''), 10);


            const res = await axios.get(`https://ludomaster.net/ludo/verify?userId=${userId}`);
            const data = res.data;

            // console.log("62 Response from server:", data);


            if (data && data.length > 0) {
                setVerified(true);


                navigation.navigate("App", {
                    mobile: parseInt(data[0].mobile)
                });
            } else {
                setVerified(false);
            }
        } catch (error) {
            console.log("62 Error fetching data:", error);
            // Handle errors here, e.g., show an error message to the user
        }
    };

    useEffect(() => {
        getNumber()
    })



    useEffect(() => {
        validateForm();
    }, [name, mobileNumber]);

    const validateForm = async () => {
        let errors = {};


        if (name == '') {
            errors.name = "Name is required";
        }

        if (mobileNumber == '') {
            errors.mobileNumber = "Mobile number is required";
        }
        else if (mobileNumber.length !== 10) {
            errors.mobileNumber = "Invalid mobile number";

        }





        setErr(errors)


        setIsFormValid(Object.keys(errors).length === 0);

    }


    const handleSubmit = async (name, mobileNumber) => {
        // name != "" && mobileNumber.length == 10

        if (isFormValid) {
            // console.log(name, mobileNumber);
            try {
                const response = await axios.post("https://ludomaster.net/ludo/signup", {
                    name: name,
                    phone: mobileNumber,
                });
                // console.log(response.data); // Log the response data
                try {
                    await AsyncStorage.setItem('user', JSON.stringify(mobileNumber));


                } catch (error) {
                    console.log("error", error)

                }


                navigation.navigate("App", {

                    mobile: mobileNumber
                })
            }

            catch (error) {
                console.warn(error); // Log any errors
            }

        }
        else {

            setFlag(true)
            // Alert.alert("Please fill all the field")
        }


    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust this offset as needed
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground
                    source={require("../../assets/loginBg.png")}
                    style={{ height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}
                    resizeMode="cover"
                >
                    <View style={{ marginTop: 400,paddingHorizontal:20 }}>
                        <View style={{ marginTop: 30 }}>
                            <View style={focusOnName ? styles.focusedTextInput : styles.inputBoxCont}>
                                <AntDesign name="user" size={24} color="gray" style={{ marginLeft: 8 }} />
                                <TextInput
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                    onFocus={() => setFocusOnName(true)}
                                    onBlur={() => setFocusOnName(false)}
                                    style={styles.textInput}
                                    placeholder="Enter your name"
                                />
                            </View>
                            {error.name && flag && <Text style={{ color: "red" }}>{error.name}</Text>}
                        </View>

                        <View>
                            <View style={focusOnNumber ? styles.focusedTextInput : styles.inputBoxCont}>
                                <MaterialIcons name="local-phone" size={24} color="gray" style={{ marginLeft: 8 }} />
                                <TextInput
                                    value={mobileNumber}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setMobileNumber(text)}
                                    onFocus={() => setFocusOnNumber(true)}
                                    onBlur={() => setFocusOnNumber(false)}
                                    style={styles.textInput}
                                    placeholder="Enter your number"
                                />
                            </View>
                            {error.mobileNumber && flag && <Text style={{ color: "red" }}>{error.mobileNumber}</Text>}
                        </View>

                        <View style={{ marginTop: 30 }} />

                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit(name, mobileNumber)}>
                            <Text allowFontScaling={false} style={styles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    inputBoxCont: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: "#fff",
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 20,
        borderColor: "#240046",
        borderBottomWidth: 2,
    },
    textInput: {
        color: "gray",
        marginVertical: 10,
        width: 300,
        fontSize: 16,
    },
    focusedTextInput: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: "#fff",
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 20,
        borderColor: "#240046",
        borderBottomWidth: 2,
    },
    button: {
        backgroundColor: "#4e148c",
        borderRadius: 25,
        borderColor: "white",
        paddingHorizontal:50,
        paddingVertical:12

    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing:2
    },
});

//  i want that when user is login once then it navigates to app screen but in app screen when i press back button then it goes to login page but if user is login then i dont want it goes to that login page