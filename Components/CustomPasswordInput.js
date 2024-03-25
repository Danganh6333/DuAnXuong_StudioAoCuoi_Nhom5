import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomPasswordInput = ({ placeholder, value, onChangeText, style }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFF', // Màu sắc thương hiệu riêng
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});

export default CustomPasswordInput;