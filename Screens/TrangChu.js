import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Slider from '../Components/Slider';

const TrangChu = () => {
  return (
    <View style={styles.container}>
      <Slider/>
    </View>
  );
};

export default TrangChu;

const styles = StyleSheet.create({
  container: {
    padding: 17,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  subtitle: {
    fontSize: 22,
  },
});
