import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './screens/Splash';
import Home from './screens/patient/Home';
import BookAppointment from './screens/patient/BookAppointment';
import Success from './screens/patient/Success';
import Pending from './screens/patient/Pending';
import Completed from './screens/patient/Completed';
import CallAmb from './screens/patient/CallAmb';
import Welcome from './screens/Welcome';
import PatientLogin from './screens/patient/PatientLogin';
import PatientSignup from './screens/patient/PatientSignup';
import DoctorLogin from './screens/doctor/DoctorLogin';
import DoctorSignup from './screens/doctor/DoctorSignup';
import DoctorHome from './screens/doctor/DoctorHome';
import FindDoctor from './screens/patient/FindDoctor';
import ListDoctors from './screens/patient/ListDoctors';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            component={Welcome}
            name="Welcome"
            options={{headerShown: false}}
        />
        <Stack.Screen
            component={PatientLogin}
            name="PatientLogin"
            options={{headerShown: false}}
        />
        <Stack.Screen
            component={PatientSignup}
            name="PatientSignup"
            options={{headerShown: false}}
        />
        <Stack.Screen
            component={DoctorLogin}
            name="DoctorLogin"
            options={{headerShown: false}}
        />
        <Stack.Screen
            component={DoctorSignup}
            name="DoctorSignup"
            options={{headerShown: false}}
        />
        <Stack.Screen
            component={DoctorHome}
            name="DoctorHome"
            options={{headerShown: false}}
        />
        <Stack.Screen
          component={Home}
          name="Home"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={BookAppointment}
          name="BookAppointment"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Success}
          name="Success"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Pending}
          name="Pending"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Completed}
          name="Completed"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={CallAmb}
          name="CallAmb"
          options={{headerShown: false}}
        />
        <Stack.Screen
            component={FindDoctor}
            name="FindDoctor"
            options={{headerShown: false}}
        />
        <Stack.Screen
            component={ListDoctors}
            name="ListDoctors"
            options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
