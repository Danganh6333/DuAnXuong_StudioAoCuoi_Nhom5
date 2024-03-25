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
import isEmail from 'validator/lib/isEmail';

const DangKy = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasswrod] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigation();
  const checkEmailExists = async email => {
    try {
      const response = await axios.get(
        `http://192.168.1.139:3000/nguoidungs/check/${email}`,
      );
      return response.data.exists;
    } catch (error) {
      console.error('Lỗi kiểm tra:', error);

      return true;
    }
  };
  const signUp = async () => {
    if (
      username.trim().length == 0 ||
      email.trim().length == 0 ||
      password.trim().length == 0 ||
      confirm.trim().length == 0
    ) {
      Alert.alert('Không được để trống trường dữ liệu');
      return;
    }
    if (!username.trim().length > 5 ) {
      Alert.alert('Tên người dùng phải dài hơn 5 chữ');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Trường dữ liệu mật khẩu phải bằng nhau');
      return;
    }
    if (!isEmail(email)) {
      Alert.alert('Email sai định dạng');
      return;
    }
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      Alert.alert('Email đã tồn tại');
    } else {
      try {
        const response = await axios.post(
          'http://192.168.1.139:3000/nguoidungs/reg',
          {
            username,
            password,
            email,
          },
        );
        console.log('Signup successful:', response.data);
        navigate.navigate('DangNhap');
      } catch (error) {
        console.error('Signup failed:', error);
        Alert.alert('Signup failed. Please try again.');
      }
    }
  };
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
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Urbanist-Italic-VariableFont_wght',
    fontWeight: '700',
    color: '#1E232C',
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
    fontFamily: 'Urbanist-VariableFont_wght',
  },
  image: {
    width: 23,
    height: 30,
  },
});
