import { View, Text, StyleSheet, StatusBar, FlatList, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { fetchDoctorBySpeciality } from '../../features/connectDb';
import { CommonBtn } from '../../components/CommonBtn';

const ListDoctors = ({navigation}) => {
    const route = useRoute();
    const { doctorData } = route.params;
    console.log(doctorData)
  return (
    <View style={{marginTop: StatusBar.currentHeight}}>
        <Text style={styles.heading}>Here are the list of Doctors:</Text>
          <View style={{marginTop: 20, alignItems: 'center', marginBottom: 100}}>
            <FlatList
              numColumns={2}
              data={doctorData}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.docItem}>
                    <Image
                      source={require('../../images/doctor.png')}
                      style={styles.docImg}
                    />
                    <Text style={styles.docName}>{item.name}</Text>
                    <Text style={styles.docSpl}>{item.speciality}</Text>
                    <Text
                      style={[
                        styles.status,
                        {
                          color: item.is_available ? 'green' : 'red',
                          opacity: item.is_available ? 1 : 0.5,
                        },
                      ]}>
                      {item.is_available ? 'Available' : 'Busy'}
                    </Text>
                    <CommonBtn
                      w={150}
                      h={40}
                      status={item.is_available ? true : false}
                      txt={'Book Appointment'}
                      onClick={() => {
                        if(item.is_available===1) {
                          navigation.navigate('BookAppointment', {
                            doctorId: item.doctor_id,
                            doctorName: item.name,
                            doctorSpc: item.speciality
                          }
                          );
                        }
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
    </View>
  )
}

export default ListDoctors

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    banner: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 10,
    },
    heading: {
      color: '#000',
      fontSize: 18,
      fontWeight: '700',
      marginTop: 15,
      marginLeft: 15,
    },
    linearGradient: {
      width: 120,
      height: 80,
      borderRadius: 10,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    catName: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
    },
    docItem: {
  
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 0.2,
      margin: 10,
    },
    docImg: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignSelf: 'center',
      marginTop: 20,
    },
    docName: {
      fontSize: 18,
      fontWeight: '700',
      alignSelf: 'center',
      marginTop: 10,
    },
    docSpl: {
      fontSize: 14,
      marginTop: 5,
      fontWeight: '600',
      alignSelf: 'center',
      color: 'green',
      backgroundColor: '#f2f2f2',
      padding: 5,
      borderRadius: 10,
    },
    status: {
      fontSize: 14,
      marginTop: 5,
      fontWeight: '600',
      alignSelf: 'center',
    },
    bottomView: {
      width: '90%',
      height: 60,
      borderRadius: 10,
      elevation: 5,
      position: 'absolute',
      bottom: 20,
      backgroundColor: '#fff',
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    bottomIcon: {
      width: 30,
      height: 30,
    },
    screenContainer: {
      flex:1,
      marginTop: StatusBar.currentHeight,
    }
  });
  