import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AppleHeader from 'react-native-apple-header';

const Header = ({title, icon}) => {
  return (
    // <View style={styles.header}>
    //   <TouchableOpacity style={styles.backBtn} underlayColor="#ffffff00">
    //     <Image source={icon} style={styles.back} />
    //   </TouchableOpacity>

    //   <Text style={[styles.title, {marginLeft: 10}]}>{title}</Text>
    // </View>
    <AppleHeader
    dateTitle={"Monday, 27 November"}
    largeTitle={title}
    style={{borderBottomWidth: 1, padding: 10}}
  onPress={() => {}}
  />
  );
};
export default Header;
const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 5,
    alignItems: 'center',
    paddingLeft: 20,
  },
  back: {
    width: 24,
    height: 24,
  },
  backBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
