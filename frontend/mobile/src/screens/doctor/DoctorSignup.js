import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../../components/Button';
import { registerDoctor } from '../../features/connectDb';

const DoctorSignup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [doctorData, setDoctorData] = useState({name:"", email:"", hospital_id: null, password: "", doctor_id:null, is_available: 1, speciality: ""})
    console.log(doctorData);

    const handleSignUp = async (doctorData) => {
        if (!doctorData.email || !doctorData.password || !doctorData.hospital_id || !doctorData.doctor_id) {
            console.error('Please fill in all required fields');
            return;
        }
    
        try {
            // Attempt to register the doctor
            await registerDoctor(doctorData);
    
            // Registration successful, navigate to DoctorHome
            navigation.navigate("DoctorHome");
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
                            placeholder='Enter Your Full Name'
                            placeholderTextColor={"#222222"}
                            onChangeText={(text)=>setDoctorData({...doctorData, name: text})}
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
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={(text)=>setDoctorData({...doctorData, email: text.toLowerCase()})}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                {/* <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Mobile Number</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "#222222",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='+91'
                            placeholderTextColor={"#222222"}
                            keyboardType='numeric'
                            style={{
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: "#CCCCCC",
                                height: "100%"
                            }}
                        />

                        <TextInput
                            placeholder='Enter your phone number'
                            placeholderTextColor={"#222222"}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                        />
                    </View> 
                </View>*/}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Hospital ID</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "#222222",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>

                        <TextInput
                            placeholder='Enter the hospital id'
                            placeholderTextColor={"#222222"}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                            onChangeText={(id)=>setDoctorData({...doctorData, hospital_id: id})}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Doctor ID</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "#222222",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>

                        <TextInput
                            placeholder='Enter the Doctor id'
                            placeholderTextColor={"#222222"}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                            onChangeText={(id)=>setDoctorData({...doctorData, doctor_id: id})}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Speciality</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "#222222",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>

                        <TextInput
                            placeholder='Your Speciality'
                            placeholderTextColor={"#222222"}
                            style={{
                                width: "80%"
                            }}
                            onChangeText={(text)=>setDoctorData({...doctorData, speciality: text})}
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
                            autoCapitalize='none'
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(pass)=>setDoctorData({...doctorData, password: pass})}
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
                    onPress={() => {handleSignUp(doctorData)}}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: "#CCCCCC",
                            marginHorizontal: 10
                        }}
                    />
                </View>

            
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DoctorSignup