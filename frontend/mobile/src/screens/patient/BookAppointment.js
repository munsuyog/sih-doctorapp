import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { CommonBtn } from '../../components/CommonBtn';
import { Button, Input } from '@rneui/themed';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import { bookAppointmentFunction } from '../../features/connectDb';

let DaysList = [];
const BookAppointment = ({ navigation }) => {
  const route = useRoute();
  const { doctorId, doctorName, doctorSpc } = route.params
  const [selectedSlot, setSelectedSlot] = useState(-1);
  const [selectedGender, setSelectedGender] = useState(0);
  const [slots, setSlots] = useState([
    { sloT: '10:00-12:00PM', selected: false },
    { sloT: '12:00-02:00PM', selected: false },
    { sloT: '02:00-04:00PM', selected: false },
    { sloT: '04:00-06:00PM', selected: false },
    { sloT: '06:00-08:00PM', selected: false },
    { sloT: '08:00-11:00PM', selected: false },
  ]);
  const [appointmentData, setAppointmentData] = useState({doctor_id: doctorId, patient_id:"", date: "", time_slot: "", symptoms: "", gender:""})
  console.log(appointmentData)
  // For date picker
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(''); // Error message

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate.toISOString().split('T')[0];
    setAppointmentData({...appointmentData, date: currentDate})
  };
  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  const bookAppointment = () => {
    // Check if any of the required fields is empty
      bookAppointmentFunction(appointmentData)
      navigation.navigate('Success');
  };

  return (
    <SafeAreaView style={styles.screenView}>
      <Header
        icon={require('../../images/back.png')}
        title={'Book Appointment'}
      />
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Image source={require('../../images/doctor.png')} style={styles.docImg} />
          <Text style={styles.name}>{doctorName}</Text>
          <Text style={styles.spcl}>{doctorSpc}</Text>
          <Text style={styles.heading}>Select Date</Text>
          <View style={styles.dateContainer}>
            <Button
              title="Select Date"
              buttonStyle={{
                borderColor: 'rgba(78, 116, 289, 1)',
              }}
              type="outline"
              titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
              containerStyle={{
                width: 100,
                marginHorizontal: 10,
                marginVertical: 10,
              }}
              onPress={showMode}
            />
            <Text>Selected: {date.toDateString()}</Text>
          </View>
          <Text style={styles.heading}>Available Slots</Text>
          <View>
            <FlatList
              numColumns={2}
              data={slots}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.timeSlot,
                      { borderColor: index == selectedSlot ? 'blue' : 'black' },
                    ]}
                    onPress={() => {
                      setSelectedSlot(index);
                      console.log(item.sloT);
                      setAppointmentData({...appointmentData, time_slot: item.sloT})
                    }}>
                    <Text
                      style={{ color: index == selectedSlot ? 'blue' : 'black' }}>
                      {item.sloT}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <Text style={styles.heading}>Patient Name</Text>
          <TextInput
            style={styles.nameInput}
            placeholder={'Enter Name'}
            onChangeText={(text) => setAppointmentData({...appointmentData, name: text})}
          />
          <Text style={styles.heading}>Patient ID</Text>
          <TextInput
            style={styles.nameInput}
            placeholder={'Enter your ID'}
            onChangeText={(text) => setAppointmentData({...appointmentData, patient_id: text})}
          />
          <Text style={styles.heading}>Age</Text>
          <TextInput
            style={styles.nameInput}
            placeholder={'Age'}
            keyboardType="numeric"
            onChangeText={(text) => setAppointmentData({...appointmentData, age: text})}
          />
          <Text style={styles.heading}>Symptoms</Text>
          <TextInput
            style={styles.nameInput}
            placeholder={'What are the symptoms?'}
            onChangeText={(text) => setAppointmentData({...appointmentData, symptoms: text})}
          />
          <Text style={styles.heading}>Select Gender</Text>
          <View style={styles.genderView}>
            <TouchableOpacity
              style={[
                styles.gender,
                {
                  borderWidth: 0.5,
                  borderColor: selectedGender == 0 ? 'blue' : 'black',
                },
              ]}
              onPress={() => {
                setAppointmentData({...appointmentData, gender: "Male"})                
              }}>
              <Image
                source={require('../../images/male.png')}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.gender,
                {
                  borderWidth: 0.5,
                  borderColor: selectedGender == 1 ? 'blue' : 'black',
                },
              ]}
              onPress={() => {
                setAppointmentData({...appointmentData, gender: "Female"})                
              }}>
              <Image
                source={require('../../images/female.png')}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.btnView}>
            <CommonBtn
              w={300}
              h={45}
              txt={'Book Now'}
              status={true}
              onClick={bookAppointment}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  docImg: {
    width: 100,
    height: 100,
    marginTop: 50,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 10,
  },
  spcl: {
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    color: 'green',
    padding: 5,
    borderRadius: 10,
  },
  heading: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 15,
  },
  timeSlot: {
    width: '45%',
    height: 40,
    borderRadius: 10,
    borderWidth: 0.5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInput: {
    borderRadius: 10,
    marginTop: 10,
    width: '94%',
    height: 45,
    borderWidth: 0.5,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  genderView: {
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  gender: {
    borderRadius: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: { marginTop: 20, marginBottom: 20 },
  dateContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  screenView: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 15,
  },
});
