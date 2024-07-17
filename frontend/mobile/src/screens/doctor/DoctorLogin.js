import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../../components/Button';
import { loginDoctor } from '../../features/connectDb';

const DoctorLogin = ({ navigation }) => {

    const loginHandler = () => {
        console.log(loginDoctorData);
        loginDoctor(loginDoctorData, setLoginSuccess)

        if(isLoginSuccess) {
            navigation.navigate('DoctorHome');
        }
    }
    const [loginDoctorData,setloginDoctorData] = useState({email: "", password: ""});
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoginSuccess, setLoginSuccess] = useState(false);
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: "#222222"
                    }}>
                        Welcome Doctor!
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: "#222222"
                    }}>Hello again you have been missed!</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "#222222",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={"#222222"}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(email) => {setloginDoctorData({...loginDoctorData, email: email})}}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "#222222",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={"#222222"}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(pass) => {setloginDoctorData({...loginDoctorData, password: pass})}}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={"#222222"} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={"#222222"} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? "#007260" : undefined}
                    />

                    <Text>Remember Me</Text>
                </View>

                <Button
                    title={isLoginSuccess ? "Logged in succesfully":"Log IN" }
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={loginHandler}
                />
                

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: "#222222" }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("DoctorSignup")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: "#007260",
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DoctorLogin