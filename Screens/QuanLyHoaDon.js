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
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AnimatedFAB} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import COMMON from '../COMMON';
import Icon from 'react-native-vector-icons/Ionicons';

const QuanLyHoaDon = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [khachHangData, setKhachHangData] = useState([]);
  const [khachHangHoTen, setKhachHangHoTen] = useState('');
  const [nhanVienData, setNhanVienData] = useState([]);
  const [dichVuData, setDichVuData] = useState([]);
  const [nhanVienHoTen, setNhanVienHoTen] = useState('');
  const [tenDichVu, setTenDichVu] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isExtended, setIsExtended] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedDichVus, setSelectedDichVus] = useState([]);

  const [idNhanVien, setIdNhanVien] = useState('');
  const [idKhachHang, setIdKhachHang] = useState('');
  const [tongTien, setTongTien] = useState(0);

  const getCurrentDate = () => {
    var date = moment().utcOffset('+07:00').format('YYYY-MM-DD hh:mm:ss a');
    setCurrentDate(date);
  };
  const calculateTotalTongTien = () => {
    let total = 0;
    selectedDichVus.forEach(dichVu => {
      total += dichVu.giaTien;
    });
    return total;
  };
  const updateTongTien = () => {
    const totalTongTien = calculateTotalTongTien();
    setTongTien(totalTongTien);
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
  const getSpinnerDichVu = async () => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/dichvus/getDichVu`,
      );
      const json = await response.json();
      setDichVuData(json);
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
    let url_api_add = `http://${COMMON.ipv4}:3000/hoadons/addHoaDon`;
    let obj = {
      idNhanVien: idNhanVien,
      idKhachHang: idKhachHang,
      ngayTao: getCurrentDate(),
      idDichVus: selectedDichVus,
      tongTien: tongTien,
    };
    console.log(obj);
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
          getHoaDon();
        }
      })
      .catch(err => {
        console.log('Lỗi Thêm Nhân Viên', err);
      });
  };
  useEffect(() => {
    updateTongTien();
  }, [selectedDichVus]);

  useEffect(() => {
    getHoaDon();
    getSpinnerKhachHang();
    getSpinnerNhanVien();
    getSpinnerDichVu();
    getCurrentDate();
  }, []);
  const removeSelectedDichVu = index => {
    const updatedSelectedDichVus = [...selectedDichVus];
    updatedSelectedDichVus.splice(index, 1);
    setSelectedDichVus(updatedSelectedDichVus);
  };

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
          contentContainerStyle={styles.flatListContent}
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
            <View style={styles.pickerWrapper}>
              <Text>Mời Nhập Khách Hàng</Text>
              <Picker
                selectedValue={nhanVienHoTen}
                onValueChange={(itemValue, itemIndex) => {
                  setNhanVienHoTen(itemValue);
                  console.log(itemValue);
                  const selectedNhanVien = nhanVienData.find(
                    nhanVien => nhanVien._id === itemValue,
                  );
                  if (selectedNhanVien) {
                    setIdNhanVien(selectedNhanVien._id);
                  }
                }}>
                {nhanVienData.map((nhanVien, index) => (
                  <Picker.Item
                    key={index}
                    label={nhanVien.hoTen}
                    value={nhanVien._id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.pickerWrapper}>
              <Text>Mời Nhập Khách Hàng</Text>
              <Picker
                selectedValue={khachHangHoTen}
                onValueChange={(itemValue, itemIndex) => {
                  setKhachHangHoTen(itemValue);
                  console.log(itemValue);
                  const selectedKhachHang = khachHangData.find(
                    khachHang => khachHang._id === itemValue,
                  );
                  if (selectedKhachHang) {
                    setIdKhachHang(selectedKhachHang._id);
                  }
                }}>
                {khachHangData.map((khachHang, index) => (
                  <Picker.Item
                    key={index}
                    label={khachHang.hoTen}
                    value={khachHang._id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.pickerWrapper}>
              <Text>Mời Bạn Chọn Dịch Vụ</Text>
              <Picker
                selectedValue={tenDichVu}
                onValueChange={(itemValue, itemIndex) => {
                  setTenDichVu(itemValue);
                  const selectedDichVu = dichVuData.find(
                    dichVu => dichVu._id === itemValue,
                  );
                  if (selectedDichVu) {
                    const exists = selectedDichVus.some(
                      dichVu => dichVu.idDichVu === selectedDichVu._id,
                    );
                    if (!exists) {
                      const newItem = {
                        idDichVu: selectedDichVu._id,
                        giaTien: selectedDichVu.giaTien,
                        tenDichVu: selectedDichVu.tenDichVu,
                      };
                      setSelectedDichVus(prevState => [...prevState, newItem]);
                    } else {
                      Alert.alert('This Dịch Vụ is already selected');
                    }
                  }
                }}>
                {dichVuData.map((dichVu, index) => (
                  <Picker.Item
                    key={index}
                    label={dichVu.tenDichVu}
                    value={dichVu._id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.selectedDichVuList}>
              <Text style={styles.selectedDichVuListTitle}>
                Selected Dịch Vụ:
              </Text>
              <ScrollView>
                {selectedDichVus.map((dichVu, index) => (
                  <View key={index} style={styles.selectedDichVuItem}>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                      <Text>Tên: {dichVu.tenDichVu}</Text>
                      <Text>Giá Tiền: {dichVu.giaTien}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeSelectedDichVu(index)}>
                      <Icon name="close-sharp" size={22} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nhập giá tiền"
              value={tongTien.toString()}
              editable={false}
              onChangeText={txt => setTongTien(txt)}
            />
            <View style={styles.buttonContainer}>
              <Button title="Thêm" onPress={addHoaDon} />
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
  flatListContent: {
    paddingBottom: 80,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pickerWrapper: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  selectedDichVuList: {
    marginTop: 20,
  },
  selectedDichVuListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedDichVuItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    gap: 180,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
