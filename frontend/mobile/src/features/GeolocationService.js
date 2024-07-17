import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateDoctorAvailability } from './connectDb';

export default function App() {
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const targetLatitude = 19.273055;
  const targetLongitude = 76.756195;

  useEffect(() => {
    getLocation(); // Initial location retrieval when the component mounts
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  const handleRefresh = () => {
    getLocation(); // Manually refresh the location
  };

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);

    const distanceInMeters = calculateDistance(
      latitude,
      longitude,
      targetLatitude,
      targetLongitude
    );

    if (distanceInMeters <= 100) {
        return (
            <View style={{flexDirection:'row', gap: 10}}>
                <Text style={{ color: 'green' }}>You are in Hospital</Text>
                <TouchableOpacity onPress={handleRefresh}>
                    <Icon name='refresh' size={15} />
                </TouchableOpacity>
            </View>
            );
    } else {
      return (
        <View style={{flexDirection:'row', gap: 10}}>
        <Text style={{ color: 'red' }}>You are not in Hospital</Text>
        <TouchableOpacity onPress={handleRefresh}>
            <Icon name='refresh' size={15} />
        </TouchableOpacity>
    </View>
        );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344 * 1000;
  console.log(dist);
  return dist;
};
