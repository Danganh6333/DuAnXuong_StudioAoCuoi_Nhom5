import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  Alert,
  Platform,
  TextInput,
} from 'react-native';
import axios from 'axios';
import CheckBox, { Checkbox } from '@react-native-community/checkbox';
import { Swipeable } from 'react-native-gesture-handler';
import CustomTextInput from '../Components/CustomTextInput';
import Button from '../Components/Button';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import COMMON from '../COMMON';
import NhanVienIdContext from '../Components/NhanVienIdContext';

const QuanLyCongViec = () => {
  const [congViec, setCongViec] = useState([]);
  const [congViec_id, setCongViec_id] = useState({});
  const [modalVisible_ctcv, setModalVisible_ctcv] = useState(false);
  const [modalVisible_editcv, setModalVisible_editcv] = useState(false);
  const [modalVisible_addcv, setModalVisible_addcv] = useState(false);
  const [modalVisible_delecv, setModalVisible_Delecv] = useState(false);
  const [modalVisible_isempty, setModalVisible_Isempty] = useState(false);
  const [modalVisible_delecv2, setModalVisible_Delecv2] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [_id, set_id] = useState('');
  const [tenCongViec, setTenCongViec] = useState('');
  const [ngayKetThuc, setNgayKetThuc] = useState('');
  const [ngayBatDau, setNgayBatDau] = useState('');

  const [noiDungCongViec, setNoiDungCongViec] = useState('');
  const [trangThai, setTrangThai] = useState(0);
  const [dateNBD, setDateNDB] = useState(new Date());
  const [dateNKT, setDateNKT] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [nhanVien, setNhanVien] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const EmployeePicker = ({ selectedEmployeeId, onEmployeeChange }) => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          `http://${COMMON.ipv4}:3000/nhanviens/getNhanVien`,
        );
        setEmployees(response.data);
      };
      fetchData();
    }, []);

    const handleEmployeeChange = value => {
      onEmployeeChange(value);
    };

    return (
      <Picker
        selectedValue={selectedEmployeeId}
        onValueChange={handleEmployeeChange}>
        <Picker.Item label="Chọn nhân viên" value={null} key="blank" />
        {employees.map(employee => (
          <Picker.Item
            label={employee.hoTen}
            value={employee._id}
            key={employee._id}
          />
        ))}
      </Picker>
    );
  };
  const getList_nv = async () => {
    try {
      const response = await axios.get(
        `http://${COMMON.ipv4}:3000/nhanviens/getNhanVien`,
      );
      setNhanVien(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy nhanVien:', error);
      Alert.alert('Lỗi!', 'Có lỗi xảy ra khi lấy dữ liệu!');
    }
  };
  const postList_cv = async () => {
    if (!tenCongViec || !noiDungCongViec || !ngayKetThuc || !ngayBatDau) {
      setModalVisible_Isempty(true);
      return; // Prevent update if required fields are empty
    }
    const obj = {
      idNhanVien: selectedEmployeeId, // Use the selected employee ID directly
      ngayBatDau,
      trangThai,
      tenCongViec,
      noiDungCongViec,
      ngayKetThuc,
    };
    try {
      await axios.post(`http://${COMMON.ipv4}:3000/congviecs/addCongViec`, obj);
      console.log(obj.idNhanVien);
      getList_cv();
      setTenCongViec('');
      setTrangThai('');
      setNoiDungCongViec('');
      setNgayBatDau('');
      setNgayKetThuc('');
      setModalVisible_addcv(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi!', 'Có lỗi xảy ra khi thêm nhân viên!' + error);
    }
  };

  const onChangeNgayBatDau = (event, selectedDateNDB) => {
    const currentDate = selectedDateNDB || dateNBD;

    setShow(Platform.OS === 'ios');
    setDateNDB(currentDate);
    setShow(false);

    let tempDatengayBatDau = new Date(currentDate);
    let fDatengayBatDau =
      tempDatengayBatDau.getFullYear() +
      '-' +
      (tempDatengayBatDau.getMonth() + 1) +
      '-' +
      tempDatengayBatDau.getDate();
    setNgayBatDau(fDatengayBatDau);

    console.log(fDatengayBatDau);

  };

  const onChangeNgayKetThuc = (event, selectedDateNKT) => {
    const currentDate = selectedDateNKT || dateNKT;
    setShow(Platform.OS === 'ios');
    setDateNKT(currentDate);
    setShow(false);
    let tempDatengayKetThuc = new Date(currentDate);
    let fDatengayKetThuc =
      tempDatengayKetThuc.getFullYear() +
      '-' +
      (tempDatengayKetThuc.getMonth() + 1) +
      '-' +
      tempDatengayKetThuc.getDate();
    setNgayKetThuc(fDatengayKetThuc);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  //format date
  const getFormattedDateNDB = dateNBD => {
    return moment(dateNBD, 'YYYY-MM-DD').format('YYYY-MM-DD');
  };
  const getFormattedDateNKT = dateNKT => {
    return moment(dateNKT, 'YYYY-MM-DD').format('YYYY-MM-DD');
  };
  // get list cong việc
  const getList_cv = async () => {
    try {
      const response = await axios.get(
        `http://${COMMON.ipv4}:3000/congviecs/getCongViec`,
      );
      setCongViec(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getList_cv();
    getList_nv();
  }, []);

  const putList_nv = async () => {
    let id = _id; // Use the stored ID for the update request
    if (!tenCongViec || !noiDungCongViec) {
      setModalVisible_Isempty(true);
      return; // Prevent update if required fields are empty
    }
    const obj = {
      ngayBatDau,
      trangThai,
      noiDungCongViec,
      tenCongViec,
      ngayKetThuc,
    };

    try {
      await axios.put(
        `http://${COMMON.ipv4}:3000/congviecs/updateCongViec/${id}`,
        obj,
      );
      getList_cv(); // Refetch employee list after successful update

      setTenCongViec('');
      setTrangThai('');
      setNoiDungCongViec('');
      setNgayBatDau('');
      setNgayKetThuc('');
      setModalVisible_editcv(false); // Close edit modal
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi!', 'Có lỗi xảy ra khi sửa nhân viên!'); // Inform user about update error
    }
  };
  const deleList_cv = async () => {
    let id = _id;
    console.log(id);
    // Check if _id is empty
    if (!id) {
      Alert.alert('Lỗi!', 'Vui lòng chọn nhân viên cần xóa!');
      return;
    }

    try {
      const response = await axios.delete(
        `http://${COMMON.ipv4}:3000/congviecs/deleteCongViec/${id}`,
      );
      response.data.success;
      setModalVisible_Delecv(false);
      getList_cv();
      setModalVisible_Delecv2(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi!', 'Có lỗi xảy ra khi xóa nhân viên!');
    }
  };
  const renderItem = ({ item }) => {
    const employee = item.idNhanVien
      ? nhanVien.find(nv => nv._id === item.idNhanVien._id)
      : null;
    const tenNhanVien = employee ? employee.hoTen : 'Đang tải...';

    return (
      <Pressable
        onPress={() => {
          setModalVisible_ctcv(true);
          setCongViec_id(item);
          setSelectedEmployee(tenNhanVien);
        }}>
        <View style={{ height: 5, backgroundColor: '#A1A1A1' }} />
        <View
          style={{
            backgroundColor: '#fff',
            height: 80,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ width: '10%' }}>

          </View>
          <View style={{ width: '70%' }}>
            <Text style={{ color: 'black' }}>Tên Công Việc:  {item.tenCongViec}</Text>

            <Text style={{ color: 'black' }}>Tên Nhân Viên:  {tenNhanVien}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={() => {
                setModalVisible_editcv(true);
                set_id(item._id);
                setTenCongViec(item.tenCongViec);
                setTrangThai(item.trangThai);
                setNgayBatDau(item.ngayBatDau);
                setNgayKetThuc(item.ngayKetThuc);
                setNoiDungCongViec(item.noiDungCongViec);
              }}>
              <Image
                style={{ width: 35, height: 35, tintColor: '#70cbff' }}
                source={require('../img/edit.png')}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisible_Delecv(true);
                set_id(item._id);
              }}>
              <Image
                style={{ width: 35, height: 35, tintColor: 'red' }}
                source={require('../img/trash.png')}
              />
            </Pressable>
          </View>
        </View>
        <View style={{ height: 5, backgroundColor: '#A1A1A1' }} />
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={congViec}
          keyExtractor={item_cv => item_cv._id}
          renderItem={renderItem}
        />
      </View>

      {/* Box 3 (Add employee button) */}
      <Pressable onPress={() => setModalVisible_addcv(true)}>
        <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('../img/add.png')}
          />
        </View>
      </Pressable>
      {/* Modal thêm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_addcv}>
        <View
          style={{
            flex: 0.8,
            margin: '15%',
            borderRadius: 30,
            backgroundColor: '#70cbff',
          }}>
          <View style={{ padding: '8%' }}>
            <Text
              style={{
                margin: '5%',
                fontSize: 22,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Thêm nhân viên
            </Text>
            <CustomTextInput
              placeholder="Tên công việc"
              onChangeText={txt => setTenCongViec(txt)}
            />
            <EmployeePicker
              selectedEmployeeId={selectedEmployeeId}
              onEmployeeChange={setSelectedEmployeeId}
            />
            <View
              style={{
                alignItems: 'center',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Pressable onPress={() => showMode('dateNBD')}>
                <View
                  style={{
                    width: 90,
                    borderRadius: 20,
                    height: 40,
                    padding: '5%',
                    justifyContent: 'center',
                    backgroundColor: '#BF9191',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}>
                    Từ Ngày
                  </Text>
                </View>
              </Pressable>
              <Text style={{ width: 72 }}>{getFormattedDateNDB(ngayBatDau)}</Text>
              {show && mode === 'dateNBD' && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateNBD}
                  mode={mode}
                  display="default"
                  onChange={onChangeNgayBatDau}
                />
              )}
            </View>
            <View
              style={{
                alignItems: 'center',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Text style={{ width: 72 }}>{getFormattedDateNKT(ngayKetThuc)}</Text>
              <Pressable onPress={() => showMode('dateNKT')}>
                <View
                  style={{
                    width: 90,
                    borderRadius: 20,
                    height: 40,
                    padding: '5%',
                    justifyContent: 'center',
                    backgroundColor: '#DAAE7B',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}>
                    Đến Ngày
                  </Text>
                </View>
              </Pressable>

              {show && mode === 'dateNKT' && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateNKT}
                  mode={mode}
                  display="default"
                  onChange={onChangeNgayKetThuc}
                />
              )}
            </View>
            <TextInput
              placeholder="Tên nhân viên"
              onChangeText={txt => setNoiDungCongViec(txt)}
              style={{
                backgroundColor: '#FFF', // Màu sắc thương hiệu riêng
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
                borderColor: '#C0C0C0',
                borderWidth: 1,
                height: 100,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                width: 100,
                height: 50,
                backgroundColor: '#B0A4A8',
                justifyContent: 'center',
                borderRadius: 25,
                alignItems: 'center',
              }}
              onPress={() => setModalVisible_addcv(false)}>
              <Text style={{ color: 'black', textAlign: 'center' }}>Đóng</Text>
            </Pressable>
            <Pressable
              style={{
                width: 100,
                height: 50,
                backgroundColor: '#B0A4A8',
                justifyContent: 'center',
                borderRadius: 25,
                alignItems: 'center',
              }}
              onPress={postList_cv}>
              <Text style={{ color: 'black', textAlign: 'center' }}>Thêm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal sửa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_editcv}>
        <View
          style={{
            flex: 0.8,
            margin: '15%',
            borderRadius: 30,
            backgroundColor: '#70cbff',
          }}>
          <View style={{ padding: '8%' }}>
            <Text
              style={{
                margin: '5%',
                fontSize: 22,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Thêm nhân viên
            </Text>
            <CustomTextInput
              placeholder="Tên công việc"
              onChangeText={txt => setTenCongViec(txt)}
              value={tenCongViec}
            />
            <View
              style={{
                alignItems: 'center',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Pressable onPress={() => showMode('date')}>
                <View
                  style={{
                    width: 90,
                    borderRadius: 20,
                    height: 40,
                    padding: '5%',
                    justifyContent: 'center',
                    backgroundColor: '#BF9191',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}>
                    Từ Ngày
                  </Text>
                </View>
              </Pressable>
              <Text style={{ width: 72 }}>{getFormattedDateNDB(ngayBatDau)}</Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateNBD}
                  mode={mode}
                  display="default"
                  onChange={onChangeNgayBatDau}
                />
              )}
            </View>
            <View
              style={{
                alignItems: 'center',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Text style={{ width: 72 }}>{getFormattedDateNKT(ngayKetThuc)}</Text>
              <Pressable onPress={() => showMode('date')}>
                <View
                  style={{
                    width: 90,
                    borderRadius: 20,
                    height: 40,
                    padding: '5%',
                    justifyContent: 'center',
                    backgroundColor: '#DAAE7B',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}>
                    Đến Ngày
                  </Text>
                </View>
              </Pressable>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateNKT}
                  mode={mode}
                  display="default"
                  onChange={onChangeNgayKetThuc}
                />
              )}
            </View>
            <TextInput
              placeholder="Tên nhân viên"
              onChangeText={txt => setNoiDungCongViec(txt)}
              value={noiDungCongViec}
              style={{
                backgroundColor: '#FFF',
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
                borderColor: '#C0C0C0',
                borderWidth: 1,
                height: 100,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <CheckBox
              style={{ marginLeft: 30 }}
              value={trangThai === 1}
              onValueChange={newTrangThai => {
                setTrangThai(newTrangThai ? 1 : 0);
              }}
            />
            <Text
              style={{ width: 150, color: trangThai === 1 ? 'green' : 'red' }}>
              {congViec_id.trangThai === 1
                ? 'Đã hoàn thành'
                : 'Đang hoàn thành'}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                width: 100,
                height: 50,
                backgroundColor: '#B0A4A8',
                justifyContent: 'center',
                borderRadius: 25,
                alignItems: 'center',
              }}
              onPress={() => setModalVisible_editcv(false)}>
              <Text style={{ color: 'black', textAlign: 'center' }}>Đóng</Text>
            </Pressable>
            <Pressable
              style={{
                width: 100,
                height: 50,
                backgroundColor: '#B0A4A8',
                justifyContent: 'center',
                borderRadius: 25,
                alignItems: 'center',
              }}
              onPress={putList_nv}>
              <Text style={{ color: 'black', textAlign: 'center' }}>Thêm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal chi tiet */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_ctcv}>
        <View
          style={{
            flex: 0.8,
            margin: '15%',
            borderRadius: 30,
            backgroundColor: '#70cbff',
          }}>
          <ScrollView style={{ maxHeight: '87%', paddingTop: '5%' }}>
            <Text
              style={{
                fontSize: 22,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Chi tiết Công việc
            </Text>
            <Text
              style={{
                marginTop: 15,
                fontSize: 19,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: '5%',
              }}>
              Tên công việc
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
                paddingLeft: '5%',
              }}>
              {' '}
              {congViec_id.tenCongViec}
            </Text>
            <Text
              style={{
                marginTop: 15,
                fontSize: 19,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: '5%',
              }}>
              Tên nhân viên
            </Text>
          <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
                paddingLeft: '5%',
              }}>
              {' '}
              {selectedEmployee}
            </Text>
            <Text
              style={{
                marginTop: 15,
                fontSize: 19,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: '5%',
              }}>
              Ngày bắt đầu
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
                paddingLeft: '5%',
              }}>
              {' '}
              {getFormattedDateNDB(congViec_id.ngayBatDau)}
            </Text>

            <Text
              style={{
                marginTop: 15,
                fontSize: 19,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: '5%',
              }}>
              Ngày kết thúc
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
                paddingLeft: '5%',
              }}>
              {' '}
              {getFormattedDateNKT(congViec_id.ngayKetThuc)}
            </Text>

            <Text
              style={{
                marginTop: 15,
                fontSize: 19,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: '5%',
              }}>
              trạng thái
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
                paddingLeft: '5%',
              }}>
              {' '}
              {congViec_id.trangThai}
            </Text>

            <Text
              style={{
                marginTop: 15,
                fontSize: 19,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: '5%',
              }}>
              Nội dung công việc :
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
                paddingLeft: '5%',
              }}>
              {' '}
              {congViec_id.noiDungCongViec}
            </Text>
          </ScrollView>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                width: 160,
                height: 50,
                backgroundColor: '#B0A4A8',
                justifyContent: 'center',
                borderRadius: 25,
                alignItems: 'center',
              }}
              onPress={() => setModalVisible_ctcv(false)}>
              <Text style={{ color: 'black', textAlign: 'center' }}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_delecv}
      //   onRequestClose={close_Modal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#0C0F14',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              width: '80%',
            }}>
            <Text style={{ color: '#FFFFFF', marginBottom: 10 }}>
              Bạn chắc chắn muốn xóa nhân viên?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Pressable
                onPress={() => {
                  setModalVisible_Delecv(false);
                }}
                style={{
                  padding: 10,
                  width: 120,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                }}>
                <Text style={{ color: '#FFFFFF' }}>Không</Text>
              </Pressable>
              <Pressable
                onPress={deleList_cv}
                style={{
                  padding: 10,
                  width: 120,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                }}>
                <Text
                  style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' }}>
                  Có
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal trống */}
      <Modal
        //    animationType="slide"
        transparent={true}
        visible={modalVisible_isempty}
      // onRequestClose={close_Modal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#0C0F14',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              width: '80%',
            }}>
            <Text style={{ color: '#FFFFFF', marginBottom: 10 }}>
              Vui lòng điền đẩy đủ thông tin
            </Text>
            <Pressable
              onPress={() => {
                setModalVisible_Isempty(false);
              }}
              style={{
                padding: 10,
                width: 120,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <Text
                style={{ color: '#70cbff', fontSize: 15, fontWeight: 'bold' }}>
                Đóng
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal thong bao */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_delecv2}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#0C0F14',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              width: '80%',
            }}>
            <Text style={{ color: '#FFFFFF', marginBottom: 10 }}>
              Xóa thành công
            </Text>
            <Pressable
              onPress={() => {
                setModalVisible_Delecv2(false);
              }}
              style={{
                padding: 10,
                width: 120,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <Text
                style={{ color: '#70cbff', fontSize: 15, fontWeight: 'bold' }}>
                Đóng
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuanLyCongViec;

const styles = StyleSheet.create({});
