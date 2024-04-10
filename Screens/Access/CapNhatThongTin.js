import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useUserId} from '../../Components/NhanVienIdContext';
import COMMON from '../../COMMON';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import {Image} from 'react-native';

const CapNhatThongTin = () => {
  const [hoTen, setHoTen] = useState('');
  const move = useNavigation();
  const [tenNguoiDung, setTenNguoiDung] = useState('');
  const [email, setEmail] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const {userId} = useUserId();
  const [anhNhanVien, setAnhNhanVien] = useState('');
  const chonAnh = useCallback(() => {
    let option = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(option, response => {
      console.log('ImagePicker response:', response); 
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets.length > 0
      ) {
        setAnhNhanVien(response.assets[0].uri);
      } else {
        console.log('User canceled image picker or encountered an error');
      }
    });
  }, []);
  
  const layThongTin = async () => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/nhanviens/SearchNhanVienById/${userId}`,
      );
      const json = await response.json();
      setTenNguoiDung(json.data.tenNguoiDung);
      setAnhNhanVien(json.data.anhNhanVien);
      setEmail(json.data.email);
      setHoTen(json.data.hoTen);
      setDiaChi(json.data.diaChi);
      setDienThoai(json.data.dienThoai);
      setGhiChu(json.data.ghiChu);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      layThongTin();
    }
  }, [userId]);

  const updateThongTin = async () => {
    try {
      const formData = new FormData();
      formData.append('hoTen', hoTen);
      formData.append('tenNguoiDung', tenNguoiDung);
      formData.append('diaChi', diaChi);
      formData.append('dienThoai', dienThoai);
      formData.append('ghiChu', ghiChu);
      if (anhNhanVien) {
        const file = {
          uri: anhNhanVien,
          type: 'image/jpeg',
          name: 'anhNhanVien.jpg',
        };
        formData.append('anhNhanVien', file);
      }
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/nhanviens/updateNhanVien/${userId}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );
      console.log('Formdata:' + JSON.stringify(formData));
      if (response.ok) {
        const data = await response.json();
        console.log('Updated successfully', data);
        setHoTen(data.data.hoTen);
        setTenNguoiDung(data.data.tenNguoiDung);
        setEmail(data.data.email);
        setDiaChi(data.data.diaChi);
        setDienThoai(data.data.dienThoai);
        setGhiChu(data.data.ghiChu);
        Alert.alert('Cập Nhật Thành Công');
        move.navigate('ManHinhChao');
      } else {
        console.error('Error updating product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Thông Tin Cá Nhân</Text>
      <TouchableOpacity
        style={styles.imagePickerButton}
        onPress={() => chonAnh()}>
        {anhNhanVien ? (
          <Image
            source={{uri: anhNhanVien}}
            style={{width: 90, height: 90, borderRadius: 45}}
          />
        ) : (
          <Icon name="person-circle-outline" size={90} color="#007bff" />
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Chọn Ảnh:</Text>
      <TextInput
        style={styles.input}
        value={hoTen}
        onChangeText={txt => setHoTen(txt)}
        placeholder="Họ Tên"
      />
      <TextInput
        style={styles.input}
        value={tenNguoiDung}
        onChangeText={txt => setTenNguoiDung(txt)}
        placeholder="Tên Người Dùng"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={txt => setEmail(txt)}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={diaChi}
        onChangeText={txt => setDiaChi(txt)}
        placeholder="Địa Chỉ"
      />
      <TextInput
        style={styles.input}
        value={dienThoai}
        onChangeText={txt => setDienThoai(txt)}
        placeholder="Điện Thoại"
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.input, {height: 100}]}
        value={ghiChu}
        onChangeText={txt => setGhiChu(txt)}
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
    marginBottom: 22,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
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
