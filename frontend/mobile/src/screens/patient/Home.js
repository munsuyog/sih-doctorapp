import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import {LinearGradient} from 'expo-linear-gradient';
import {CommonBtn} from '../../components/CommonBtn';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { fetchAllDoctors } from '../../features/connectDb';
import Button from '../../components/Button';


const Home = ({navigation}) => {
  // const route = useRoute();
  // const { patientId } = route.params
  const [doctorData, setDoctorData] = useState(
    [{}]
  )
  fetchAllDoctors(setDoctorData);
  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Header title={'DoctorApp'} icon={require('../../images/logo.png')} />
          <Image
            source={require('../../images/banner.jpg')}
            style={styles.banner}
          />
          <Button
            title="Book Appointment"
            style={{margin: 50}}
            onPress={()=>{navigation.navigate("FindDoctor")}}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Completed');
          }}
          style={{alignItems:'center'}}>
        <Icon name='check-circle' size={30} />
          <Text>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems:'center'}}
          onPress={() => {
            navigation.navigate('Pending');
          }}>
        <Icon name='history' size={30} />
        <Text>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems:'center'}}
          onPress={() => {
            navigation.navigate('CallAmb');
          }}>
        <Icon name='ambulance' size={30} />
        <Text>Emergency</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
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
    width: '45%',

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
