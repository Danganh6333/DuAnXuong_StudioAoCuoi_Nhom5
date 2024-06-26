import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText, style}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
});

export default CustomTextInput;