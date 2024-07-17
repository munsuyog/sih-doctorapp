import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodayAppointments = ({handleAppointmentsCount}) => {
  const [patientData, setPatientData] = useState([
    { id: 1, name: "Mr.Akash", slot: "2:00PM-4:00PM", isCritical: false, isAccepted: false, symptoms: "Fever, Cold and Cough" },
    { id: 2, name: "Mr.Akash", slot: "4:00PM-6:00PM", isCritical: false, isAccepted: false, symptoms: "Fever, Cold and Cough" },
    { id: 3, name: "Mr.Akash", slot: "8:00PM-10:00PM", isCritical: false, isAccepted: false, symptoms: "Fever, Cold and Cough" },
    { id: 4, name: "Mr.Akash", slot: "8:00PM-10:00PM", isCritical: false, isAccepted: false, symptoms: "Fever, Cold and Cough" },
  ]);

  const handleReject = (id) => {
    // Filter the patientData array to exclude the rejected patient's data
    const updatedPatientData = patientData.filter((patient) => patient.id !== id);
    setPatientData(updatedPatientData);
    const count = updatedPatientData.length
    handleAppointmentsCount(count);
  };

  return (
    <View style={{ backgroundColor: '#FFF5EC', width: '90%', padding: 20, borderRadius: 10, height: '100%', borderColor: 'black', borderWidth:1 }}>
      <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 10 }}>Today's Appointments</Text>
      <View style={{ borderBottomWidth: 1, borderColor: 'black' }}></View>
      <ScrollView>
        {patientData.length > 0 ? (
          <FlatList
            data={patientData}
            renderItem={({ item, index }) => {
              return (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', borderColor: '#CCCCC', borderBottomWidth: 1, marginTop: 10, }}>
                  <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ margin: 2, fontSize: 15, fontWeight: 'bold' }}>{item.name}</Text>
                      <View style={{ margin: 2, flexDirection: 'row', gap: 10 }}><Icon name='clock-o' size={15} /><Text>{item.slot}</Text></View>
                    </View>
                    <Text style={{ margin: 2 }}>Symptoms: {item.symptoms}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button} onPress={() => { item.isAccepted = true }}>
                      <Text>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { handleReject(item.id) }}>
                      <Text>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text style={{textAlign: 'center', marginTop: 100}}>No appointments for today!</Text>
        )}
      </ScrollView>
    </View>
  );
}

export default TodayAppointments;

const styles = StyleSheet.create({
  button: {
    width: 60,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    padding: 4,
    borderRadius: 10,
    alignItems: 'center'
  }
})
