import {
  Alert,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SignIn_TextInput from '../../Components/SignUp_TextInput';

const DangKy = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasswrod] = useState('');
  const [confirm, setConfirm] = useState('');

  const signUp = () => {
    if (
      username.trim().length == 0 ||
      email.trim().length == 0 ||
      password.trim().length == 0 ||
      confirm.trim().length == 0
    ) {
      Alert.alert('Không được để trống trường dữ liệu');
      return;
    }
    if(password !== confirm){
      Alert.alert('Trường dữ liệu mật khẩu phải bằng nhau');
      return;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello! Register to get{'\n'}started</Text>
      <View style={styles.inputGroup}>
        <SignIn_TextInput
          placeholder="Username"
          onChangeText={txt => setUsername(txt)}
        />
        <SignIn_TextInput
          placeholder="Email"
          onChangeText={txt => setEmail(txt)}
        />
        <SignIn_TextInput
          placeholder="Password"
          onChangeText={txt => setPasswrod(txt)}
        />
        <SignIn_TextInput
          placeholder="Confirm Password"
          onChangeText={txt => setConfirm(txt)}
        />
      </View>
      <TouchableOpacity onPress={() => signUp()} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DangKy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  text: {
    fontFamily: 'Rubik-VariableFont_wght',
    fontWeight: '700',
    color: '#1e232c',
    fontSize: 31,
  },
  inputGroup: {
    margin: 20,
  },
  button: {
    backgroundColor: '#9e896a',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
