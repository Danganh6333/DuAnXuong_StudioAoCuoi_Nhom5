import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AnimatedFAB} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import COMMON from '../COMMON';

const QuanLyHoaDon = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [khachHangData, setKhachHangData] = useState([]);
  const [khachHangHoTen, setKhachHangHoTen] = useState('');
  const [nhanVienData, setNhanVienData] = useState([]);
  const [nhanVienHoTen, setNhanVienHoTen] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isExtended, setIsExtended] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [tenKhachHang, setTenKhachHang] = useState('');
  const [idNhanVien, setIdNhanVien] = useState('');
  const [idKhachHang, setIdKhachHang] = useState('');
  const [tongTien, setTongTien] = useState('');

  const getCurrentDate = () => {
    var date = moment().utcOffset('+07:00').format('YYYY-MM-DD hh:mm:ss a');
    setCurrentDate(date);
  };

  const onScroll = ({nativeEvent}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const toggleAddDialog = value => {
    setShowAddDialog(value);
  };

  const fabStyle = {right: 10, bottom: 2};

  const getSpinnerKhachHang = async () => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/khachhangs/getKhachHang`,
      );
      const json = await response.json();
      setKhachHangData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getSpinnerNhanVien = async () => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/nhanviens/getNhanVien`,
      );
      const json = await response.json();
      setNhanVienData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getHoaDon = async () => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/hoadons/getHoaDon`,
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addHoaDon = async () => {
    let url_api_add = `http://${COMMON.ipv4}:3000/hoadons/addHoaDon/`;
    let obj = {
      idNhanVien: idNhanVien,
      idKhachHang: idKhachHang,
      ngayTao: getCurrentDate,
      tongTien: tongTien,
    };
    fetch(url_api_add, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(res => {
        if (res.ok) {
          Alert.alert('Thêm thành công');
          setShowAddDialog(false);
          getDanhSachDichVu();
        }
      })
      .catch(err => {
        console.log('Lỗi Thêm Nhân Viên', err);
      });
  };

  useEffect(() => {
    getHoaDon();
    getSpinnerKhachHang();
    getSpinnerNhanVien();
    getCurrentDate();
  }, []);

  return (
    <View style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          onScroll={onScroll}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.label}>Dịch vụ:</Text>
                <Text style={styles.info}>
                  Khách hàng: {item.idKhachHang.hoTen}
                </Text>
                <Text style={styles.info}>
                  Nhân viên: {item.idNhanVien.hoTen}
                </Text>
                <Text style={styles.info}>Ngày tạo: {item.ngayTao}</Text>
                <Text style={styles.info}>Tổng tiền: {item.tongTien}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item._id}
        />
      )}
      <AnimatedFAB
        icon="plus"
        label="Thêm mới"
        extended={isExtended}
        onPress={() => toggleAddDialog(true)}
        visible={true}
        animateFrom="right"
        iconMode="dynamic"
        style={[styles.fabStyle, fabStyle]}
        labelStyle={styles.fabLabel}
        contentStyle={styles.fabContent}
      />
      <Modal visible={showAddDialog} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Tạo Hóa Đơn</Text>
            <TextInput style={styles.input} placeholder="Nhập tên sản phẩm" />
            <Text style={styles.info}>Ngày tạo: {currentDate}</Text>
            <Picker
              selectedValue={nhanVienHoTen}
              onValueChange={(itemValue, itemIndex) => {
                setNhanVienHoTen(itemValue);
                const selectedNhanVien = nhanVienData.find(
                  nhanVien => nhanVien.hoTen === itemValue,
                );
                if (selectedNhanVien) {
                  setIdNhanVien(selectedNhanVien.id);
                }
              }}>
              {nhanVienData.map((nhanVien, index) => (
                <Picker.Item
                  key={index}
                  label={nhanVien.hoTen}
                  value={nhanVien.hoTen} 
                />
              ))}
            </Picker>

            <Picker
              selectedValue={khachHangHoTen}
              onValueChange={(itemValue, itemIndex) => {
                setKhachHangHoTen(itemValue);
                setIdKhachHang(itemValue);
              }}>
              {khachHangData.map((khachHang, index) => (
                <Picker.Item
                  key={index}
                  label={khachHang.hoTen}
                  value={khachHang.id}
                />
              ))}
            </Picker>
            <TextInput style={styles.input} placeholder="Nhập giá tiền" />
            <View style={styles.buttonContainer}>
              <Button title="Đóng" onPress={() => setShowAddDialog(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuanLyHoaDon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  info: {
    marginBottom: 8,
    fontSize: 14,
  },
  fabStyle: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fabContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
