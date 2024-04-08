import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import Button from '../../Components/Button';
import axios from 'axios';
import CustomPasswordInput from '../../Components/CustomPasswordInput';
import {useNavigation} from '@react-navigation/native';
import {Snackbar} from 'react-native-paper';
import COMMON from '../../COMMON';
import { useUserId } from '../../Components/NhanVienIdContext';

const DangNhap = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const {setUserId} = useUserId();
  const handleLogin = async () => {
    if (isEmpty(email) || isEmpty(matKhau)) {
      console.log('Vui lòng điền đầy đủ thông tin');
      return;
    }
    try {
      const response = await axios.post(
        `http://${COMMON.ipv4}:3000/nhanviens/doLogin`,
        {
          email: email,
          matKhau: matKhau,
        },
      );
      const userId = response.data.user._id;
      console.log('User ID:', userId);
      console.log('Login response:', response.data);
      setUserId(userId)
      navigation.navigate('Drawer', { userData: response.data });
    } catch (error) {
      console.log('Login failed:', error);
      setVisible(true);
    }
  };

  const handleResetPassword = () => {
    navigation.navigate('ThayDoiMatKhau');
  };

  const isEmpty = value => {
    // Kiểm tra xem giá trị có rỗng hay không
    return value.trim() === '';
  };

  const toggleRememberPassword = () => {
    setRememberPassword(prevValue => !prevValue);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Đăng Nhập</Text>
        <View style={{marginTop: 50}}>
          <Text style={{marginLeft: 10}}>Usename</Text>
          <CustomTextInput
            placeholder="Tên Đăng Nhập"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={{marginLeft: 10}}>password</Text>
          <CustomPasswordInput
            placeholder="Mật khẩu"
            value={matKhau}
            onChangeText={setMatKhau}
          />

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={toggleRememberPassword}>
              {rememberPassword ? (
                <Text style={styles.checkboxText}>✔</Text>
              ) : null}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </View>

          <Button title="Đăng Nhập" onPress={handleLogin} />

          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'center',
              }}>
              <Text style={{color: '#828282', fontWeight: '700'}}>
                Bạn chưa có tài khoản?
              </Text>
              <TouchableOpacity onPress={handleResetPassword}>
                <Text style={{color: '#D17842', fontWeight: '700'}}>
                  {' '}
                  Reset
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                marginBottom: 60,
                justifyContent: 'center',
              }}></View>
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
        }}
        style={styles.snackbar}>
        Đăng nhập sai thông tin,mời bạn đăng nhập lại
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  snackbar: {
    width: '100%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 140,
    marginBottom: 20,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#828282',
    borderRadius: 3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    color: '#828282',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxLabel: {
    color: '#828282',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DangNhap;
