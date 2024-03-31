import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CapNhatThongTin = () => {
  const [hoTen, setHoTen] = useState('');
  const [tenNguoiDung, setTenNguoiDung] = useState('');
  const [email, setEmail] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const { userId } = useUserId();
  return (
    <View style={styles.container}> 
    <Text style={styles.sectionTitle}>Thông Tin Cá Nhân</Text>
      <TouchableOpacity style={styles.imagePickerButton}>
        <Icon name='person-circle-outline' size={90} color='#007bff' />
      </TouchableOpacity>
      <Text style={styles.label}>Chọn Ảnh:{userId}</Text>
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
        style={[styles.input, { height: 100 }]}
        value={ghiChu}
        onChangeText={setGhiChu}
        placeholder="Ghi Chú"
        multiline
      />
      <Button title="Cập Nhật Thông Tin" color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    marginTop: 20,
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
    marginBottom: 15,
  },
});

export default CapNhatThongTin;
