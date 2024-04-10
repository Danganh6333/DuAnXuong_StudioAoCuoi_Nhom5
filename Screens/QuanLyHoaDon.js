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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useUserId} from '../Components/NhanVienIdContext';

const QuanLyHoaDon = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [khachHangData, setKhachHangData] = useState([]);
  const [nhanVienData, setNhanVienData] = useState([]);
  const [dichVuData, setDichVuData] = useState([]);
  const [tenDichVu, setTenDichVu] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isExtended, setIsExtended] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedDichVus, setSelectedDichVus] = useState([]);
  const {userId} = useUserId();
  const [idNhanVien, setIdNhanVien] = useState('');
  const [idKhachHang, setIdKhachHang] = useState('');
  const [tongTien, setTongTien] = useState(0);
  const [hoaDonName, setHoaDonName] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDichVuDetails, setSelectedDichVuDetails] = useState([]);
  const [selectedHoaDon, setSelectedHoaDon] = useState(null);
  const [showUpdateCompleteDialog, setShowUpdateCompleteDialog] =
    useState(false);

  const toggleUpdateCompleteDialog = () => {
    setShowUpdateCompleteDialog(!showUpdateCompleteDialog);
  };

  const updateTrangThai = async (hoaDonId, idDichVu, newTrangThai) => {
    try {
      const url = `http://${COMMON.ipv4}:3000/hoadons/updateHoaDon/${hoaDonId}`;
      console.log('yssss' + hoaDonId);
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({idDichVu, trangThai: newTrangThai}),
      });

      if (response.ok) {
        console.log('Trạng thái đã được cập nhật thành công');
      } else {
        console.error('Lỗi khi cập nhật trạng thái');
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu cập nhật trạng thái:', error);
    }
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

  const getCurrentDate = () => {
    var date = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');
    setCurrentDate(date);
  };
  const updateHoaDon = async item => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/hoadons/updateHoanThanhHoaDon/${item}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hoanThanh: 1,
          }),
        },
      );
      if (response.ok) {
        console.log('HoaDon updated successfully');
      } else {
        console.error('Failed to update HoaDon');
      }
    } catch (error) {
      console.error('Error updating HoaDon:', error);
    }
  };

  const addHoaDon = async () => {
    let url_api_add = `http://${COMMON.ipv4}:3000/hoadons/addHoaDon`;
    let obj = {
      idNhanVien: userId,
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
    if (nhanVienData.length > 0) {
      setIdNhanVien(nhanVienData[0]._id);
    }
    if (khachHangData.length > 0) {
      setIdKhachHang(khachHangData[0]._id);
    }
  }, [nhanVienData, khachHangData]);

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
  const showHoaDon = async item => {
    try {
      let url_api_add = `http://${COMMON.ipv4}:3000/hoadons/searchHoaDon/${item._id}`;
      const response = await fetch(url_api_add);
      const json = await response.json();
      setSelectedDichVuDetails(json.data.idDichVus);
      console.log(json.data.idDichVus);
      const formattedNgayTao = moment(json.data.ngayTao).format('YYYY-MM-DD');
      setSelectedHoaDon({...item, ngayTao: formattedNgayTao});
      if (selectedHoaDon && selectedHoaDon.idDichVus) {
        console.log('idDichVus:');
        selectedHoaDon.idDichVus.forEach(dichVuItem => {
          console.log(dichVuItem.idDichVu);
        });
      }
      setShowDetail(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
      {loading ? (
        <ActivityIndicator size="large" color="#ff6f61" />
      ) : (
        <FlatList
          data={data}
          onScroll={onScroll}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.ItemContainer}
              onPress={() => showHoaDon(item)}>
              <View style={styles.content}>
                <Text style={styles.customerName}>
                  Khách hàng: {item.idKhachHang.hoTen}
                </Text>
                <Text style={styles.employeeName}>
                  Nhân viên: {item.idNhanVien.hoTen}
                </Text>
                <Text style={styles.date}>
                  Ngày tạo: {moment(item.ngayTao).format('DD-MM-YYYY')}
                </Text>
                <Text style={styles.total}>
                  Tổng tiền:{' '}
                  {item.tongTien.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Text>
              </View>
            </TouchableOpacity>
          )}
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
                selectedValue={idKhachHang}
                onValueChange={(itemValue, itemIndex) => {
                  setIdKhachHang(itemValue);
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
                      Alert.alert('Dịch Vụ Đã Được Chọn');
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
                    <View style={styles.dichVuContainer}>
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
      <Modal visible={showDetail} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Chi Tiết Hóa Đơn</Text>
            {selectedHoaDon && (
              <>
                <Text style={styles.info}>
                  Ngày tạo: {selectedHoaDon.ngayTao}
                </Text>
                <Text style={styles.info}>
                  Họ tên Khách hàng: {selectedHoaDon.idKhachHang.hoTen}
                </Text>
                <Text style={styles.info}>
                  Tổng tiền: {selectedHoaDon.tongTien}
                </Text>
                <Text style={styles.info}>Dịch vụ:</Text>
                {selectedHoaDon &&
                  selectedHoaDon.idDichVus &&
                  selectedHoaDon.idDichVus.map((dichVuItem, index) => {
                    const dichVu = dichVuData.find(
                      item => item._id === dichVuItem.idDichVu,
                    );
                    return (
                      <View key={index} style={styles.selectedDichVuItem}>
                        {dichVu && (
                          <>
                            <BouncyCheckbox
                              size={25}
                              fillColor="red"
                              unFillColor="#FFFFFF"
                              iconStyle={{borderColor: 'red'}}
                              innerIconStyle={{borderWidth: 2}}
                              isChecked={dichVuItem.trangThai === 1}
                              onPress={isChecked => {
                                if (selectedHoaDon.hoanThanh !== 1) {
                                  updateTrangThai(
                                    selectedHoaDon._id,
                                    dichVuItem._id,
                                    isChecked ? 1 : 0,
                                  );
                                }
                              }}
                            />
                            <Text style={styles.dichVuName}>
                              Tên dịch vụ: {dichVu.tenDichVu}
                            </Text>
                            <Text style={styles.dichVuPrice}>
                              Giá tiền: {dichVu.giaTien}
                            </Text>
                          </>
                        )}
                      </View>
                    );
                  })}
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowDetail(false)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.completedButton}
              onPress={toggleUpdateCompleteDialog}
              disabled={selectedHoaDon && selectedHoaDon.hoanThanh === 1}>
              <Text style={styles.closeButtonText}>Xác Nhận Hoàn Thành</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showUpdateCompleteDialog}
        transparent={true}
        animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Xác Nhận Hoàn Thành Hóa Đơn</Text>
            <Text style={styles.info}>Bạn có chắc muốn cập nhật hóa đơn?</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Xác Nhận"
                onPress={() => {
                  toggleUpdateCompleteDialog();
                  if (selectedHoaDon) {
                    updateHoaDon(selectedHoaDon._id);
                    console.log(selectedHoaDon._id);
                  }
                }}
              />
              <Button title="Hủy" onPress={toggleUpdateCompleteDialog} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuanLyHoaDon;

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: '#ff6f61',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 20,
  },
  completedButton: {
    backgroundColor: '#42D2F2',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 18,
    color: '#333333',
  },
  info: {
    marginBottom: 12,
    fontSize: 16,
    color: '#666666',
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    marginHorizontal: 20,
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
  dichVuContainer: {
    marginBottom: 10,
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

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ItemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    padding: 20,
  },
  customerName: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  employeeName: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666666',
  },
  date: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666666',
  },
  total: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  dichVuName: {
    fontSize: 16,
    color: '#666666',
  },
  dichVuPrice: {
    fontSize: 14,
    color: '#666666',
  },
  closeButton: {
    backgroundColor: '#ff6f61',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
