import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import SymptomDropdown from '../../components/patients/SymptomDropdown'

const FindDoctor = ({ navigation }) => {
  return (
    <View style={{marginTop: StatusBar.currentHeight, flex: 1}}>
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}> 
        <SymptomDropdown navigation = {navigation}/>
    </View>
      
    </View>
  )
}

export default FindDoctor