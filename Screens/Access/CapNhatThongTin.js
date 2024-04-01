import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useUserId} from '../../Components/NhanVienIdContext';
import COMMON from '../../COMMON';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

const CapNhatThongTin = () => {
  const [hoTen, setHoTen] = useState('');
  const move = useNavigation();
  const [tenNguoiDung, setTenNguoiDung] = useState('');
  const [email, setEmail] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const {userId} = useUserId();
  const [anhNhanVien, setAnhNhanVien] = useState(null);
  const chonAnh = useCallback(() => {
    let option = {
      mediaType: 'photo',
      selectionLimit: 0,
    };
    ImagePicker.launchImageLibrary(option, setAnhNhanVien);
  }, []);
  const updateThongTin = async () => {
    const updatedItem = {
      hoTen: hoTen,
      tenNguoiDung: tenNguoiDung,
      diaChi: diaChi,
      dienThoai: dienThoai,
      ghiChu: ghiChu,
    };
    fetch(
      `http://${COMMON.ipv4}:3000/nhanviens/updateNhanVien/${userId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      },
    )
      .then(response => response.json())
      .then(data => {
        console.log('Updated successfully', data);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Thông Tin Cá Nhân</Text>
      <TouchableOpacity style={styles.imagePickerButton} onPress={()=>chonAnh()}>
        <Icon name="person-circle-outline" size={90} color="#007bff" />
      </TouchableOpacity>
      <Text style={styles.label}>Chọn Ảnh:</Text>
      <TextInput
        style={styles.input}
        value={hoTen}
        onChangeText={setHoTen}
        placeholder="Họ Tên"
      />
      <TextInput
        style={styles.input}
        value={tenNguoiDung}
        onChangeText={setTenNguoiDung}
        placeholder="Tên Người Dùng"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={diaChi}
        onChangeText={setDiaChi}
        placeholder="Địa Chỉ"
      />
      <TextInput
        style={styles.input}
        value={dienThoai}
        onChangeText={setDienThoai}
        placeholder="Điện Thoại"
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.input, {height: 100}]}
        value={ghiChu}
        onChangeText={setGhiChu}
        placeholder="Ghi Chú"
        multiline
      />
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button
            title="Cập Nhật Thông Tin"
            color="#007bff"
            onPress={updateThongTin}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Trở Về"
            color="#007bff"
            onPress={() => move.navigate('Drawer')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22, // Adjust this value as needed
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5, // Adjust this value as needed for spacing between buttons
  },
  label: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  imagePickerButton: {
    alignSelf: 'center',
    marginBottom: 14,
  },
});

export default CapNhatThongTin;
