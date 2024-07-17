import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodayAppointments from '../../components/doctor/TodayAppointments'
import GeolocationService from '../../features/GeolocationService'

const DoctorHome = () => {
    const [numberOfAppointments, setNumberOfAppointments] = useState(20);
    const handleAppointmentsCount = (newNumberOfAppointments) => {
        setNumberOfAppointments(newNumberOfAppointments);
      };
  return (
    <SafeAreaView style={styles.screenContainer}>
        <View style={{margin: 22}}>
            <Text style={{fontSize: 22,}}>Welcome</Text>
            <Text style={{fontSize: 25}}>Doctor!</Text>
            <GeolocationService/>
        </View>
        <View style={{flex: 0.7, alignItems: 'center'}}>
            <TodayAppointments handleAppointmentsCount = {handleAppointmentsCount}/>
        </View>
        <View>
            <TouchableOpacity style={{backgroundColor: '#D4D4D4', width: '45%', borderRadius: 20, borderColor: 'black', borderWidth:1, margin: 20, padding: 20}}>
                <Text style={{fontSize:18, fontWeight:'bold'}}>Number of Appointments</Text>
                <Text style={{fontSize: 50, marginTop: 20, fontWeight: 700, color: 'green'}}>{numberOfAppointments}</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default DoctorHome

const styles = StyleSheet.create({
    screenContainer: {
        flex:1,
        marginTop: StatusBar.currentHeight
    }
})