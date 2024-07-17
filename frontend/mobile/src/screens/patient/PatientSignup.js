import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../../components/Button';
import { registerPatient } from '../../features/connectDb';


const PatientSignup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [patientsData, setPatientsData] = useState({email:"", password:"", name: "", age: "", patient_id: "" });
    const signUpHandler = async () => {

        try {
            // Attempt to register the doctor
            await registerPatient(patientsData);
    
            // Registration successful, navigate to DoctorHome
            navigation.navigate("Home");
        } catch (error) {
            // Registration failed, show an error message
            console.error('Registration failed:', error);
            // You can display an error message to the user here
            // For example, set an error message state variable and render it in your UI
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <ScrollView>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: "#222222"
                    }}>
                        Create Account
                    </Text>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Full Name</Text>

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
                            placeholder='Enter your Full Name'
                            onChangeText={(input) => {setPatientsData({...patientsData, name: input})}}
                            placeholderTextColor={"#222222"}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>ID</Text>

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
                            placeholder='Enter a Unique ID'
                            onChangeText={(input) => {setPatientsData({...patientsData, patient_id: input})}}
                            placeholderTextColor={"#222222"}
                            keyboardType='numeric'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Age</Text>

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
                            placeholder='Enter your age'
                            onChangeText={(input) => {setPatientsData({...patientsData, age: input})}}
                            placeholderTextColor={"#222222"}
                            keyboardType='numeric'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
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
                            onChangeText={(input) => {setPatientsData({...patientsData, email: input})}}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
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
                            onChangeText={(input) => {setPatientsData({...patientsData, password: input})}}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
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

                <Button
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={signUpHandler}
                />            
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PatientSignup