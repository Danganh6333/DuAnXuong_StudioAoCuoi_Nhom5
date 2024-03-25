import {
  Alert,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import SignIn_TextInput from '../../Components/SignUp_TextInput';
import {useNavigation} from '@react-navigation/native';

const ThayDoiMatKhau = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasswrod] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => navigate.navigate('DangNhap')}>
        <Image
          source={require('../../assets/images/angle-left.png')}
          style={styles.image}
        />
      </TouchableOpacity>
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
      <TouchableOpacity  style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThayDoiMatKhau;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Rubik-VariableFont_wght',
    fontWeight: '700',
    color: '#1e232c',
    fontSize: 31,
  },
  inputGroup: {
    marginTop: 50,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#9e896a',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
  },
  btnContainer: {
    marginHorizontal: 2,
    marginVertical: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 23,
    height: 30,
  },
});
