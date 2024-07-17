import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export const CommonBtn = ({w, h, txt, onClick, status}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onClick();
      }}
      style={{alignSelf: 'center', marginTop: 10, marginBottom: 10}}>
      {status ? (
        <LinearGradient
          colors={['#007260', '#007260']}
          style={{
            width: w,
            height: h,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>{txt}</Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={['#8e8e8e', '#8e8e8e']}
          style={{
            width: w,
            height: h,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            opacity: 0.5,
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>{txt}</Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};
