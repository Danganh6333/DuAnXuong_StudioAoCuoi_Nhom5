import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const SignIn_TextInput = ({placeholder, onChangeText}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChangeText} />
    </View>
  );
};

export default SignIn_TextInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#f7f8f9',
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginBottom:12
  },
  input: {
    fontSize: 16,
    color: '#a0abb7',
  },
});
