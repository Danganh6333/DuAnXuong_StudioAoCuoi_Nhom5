import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import axios from 'axios';
import CustomTextInput from '../Components/CustomTextInput';
import Button from '../Components/Button';
import COMMON from '../COMMON';
const QuanLyNhanVien = () => {
  const [nhanVien, setNhanVien] = useState([]);
  const [nhanVien_id, setNhanVien_id] = useState({});
  const [modalVisible_ctnv, setModalVisible_ctnv] = useState(false);
  const [modalVisible_editnv, setModalVisible_editnv] = useState(false);
  const [modalVisible_addnv, setModalVisible_addnv] = useState(false);
  const [_id, set_id] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [email, setEmail] = useState('');
  const [tenNguoiDung, setTenNguoiDung] = useState('nhanvien01');
  const [matKhau, setMatKhau] = useState('nhanvien01');
  const [diaChi, setDiaChi] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const getList_nv = async () => {
    try {
      const response = await axios.get(
        `http://${COMMON.ipv4}:3000/nhanviens/getNhanVien`,
      );
      setNhanVien(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getList_nv();
  }, []);

  const putList_nv = async () => {
    let id = _id; // Use the stored ID for the update request

    if (!id || !hoTen || !email || !diaChi || !dienThoai) {
      Alert.alert('Lỗi!', 'Vui lòng nhập đầy đủ thông tin nhân viên cần sửa!');
      return; // Prevent update if required fields are empty
    }

    const obj = {hoTen, email, diaChi, dienThoai, ghiChu};

    try {
      await axios.put(
        `http://${COMMON.ipv4}:3000/nhanviens/updateNhanVien/${id}`,
        obj,
      );
      getList_nv(); // Refetch employee list after successful update
      setModalVisible_editnv(false); // Close edit modal
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi!', 'Có lỗi xảy ra khi sửa nhân viên!'); // Inform user about update error
    }
  };
  const postList_nv = async () => {
    if (!hoTen || !email || !diaChi || !dienThoai) {
      Alert.alert('Lỗi!', 'Vui lòng nhập đầy đủ thông tin nhân viên cần sửa!');
      return; // Prevent update if required fields are empty
    }
    const obj = {
      hoTen,
      tenNguoiDung,
      matKhau,
      email,
      diaChi,
      dienThoai,
      ghiChu,
    };

    try {
      await axios.post(`http://${COMMON.ipv4}:3000/nhanviens/addNhanVien`, obj);
      getList_nv(); // Refetch employee list after successful update
      setModalVisible_addnv(false); // Close edit modal
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi!', 'Có lỗi xảy ra khi thêm nhân viên!'); // Inform user about update error
    }
  };

  const renderItem = ({item}) => {
    const deleList_nv = async () => {
      let id = item._id; // Sử dụng ID đã lưu để thực hiện yêu cầu xóa
      if (!id) {
        Alert.alert('Lỗi!', 'Vui lòng chọn nhân viên cần xóa!');
        return; // Ngăn chặn việc xóa nếu không có ID được cung cấp
      }
      try {
        const response = await axios.delete(
          `http://${COMMON.ipv4}:3000/nhanviens/deleteNhanVien/` + id,
        );
        response.data.success;
        Alert.alert('Thành công!', 'Nhân viên đã được xóa!');
        getList_nv(); // Lấy lại danh sách nhân viên sau khi xóa thành công
      } catch (error) {
        console.error(error);
        Alert.alert('Lỗi!', 'Có lỗi xảy ra khi xóa nhân viên!');
      }
    };
    return (
      <Pressable
        onPress={() => {
          setModalVisible_ctnv(true);
          setNhanVien_id(item);
        }}>
        <View style={{height: 5, backgroundColor: '#A1A1A1'}}></View>
        <View
          style={{
            backgroundColor: '#6671D7',
            height: 80,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../img/user.png')}
          />
          <View>
            <Text style={{color: 'black'}}>{item.hoTen}</Text>
            <Text style={{color: 'black'}}>{item.email}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={() => {
                setModalVisible_editnv(true);
                set_id(item._id);
                setHoTen(item.hoTen);
                setEmail(item.email);
                setDiaChi(item.diaChi);
                setDienThoai(item.dienThoai);
                setGhiChu(item.ghiChu);
              }}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../img/edit.png')}
              />
            </Pressable>
            <Pressable onPress={() => deleList_nv()}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../img/trash.png')}
              />
            </Pressable>
          </View>
        </View>
        <View style={{height: 5, backgroundColor: '#A1A1A1'}}></View>
      </Pressable>
    );
  };
  return (
    <View style={{backgroundColor: 'red', flex: 1}}>
      {/* Box 1 (Optional header) */}
      {/* <View style={{ ... }}>
        {/* Header content */}
      {/* </View> */}

      {/* Box 2 (Employee list) */}
      <View style={{flex: 1}}>
        <FlatList
          data={nhanVien}
          keyExtractor={item_nv => item_nv._id}
          renderItem={renderItem}
        />
      </View>

      {/* Box 3 (Add employee button) */}
      <Pressable onPress={() => setModalVisible_addnv(true)}>
        <View style={{position: 'absolute', bottom: 5, right: 5}}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../img/add.png')}
          />
        </View>
      </Pressable>

      {/* Modal chi tiết */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_ctnv}>
        <View
          style={{
            flex: 1,
            margin: '15%',
            borderRadius: 30,
            backgroundColor: '#fff666',
          }}>
          <ScrollView style={{maxHeight: '87%', paddingTop: '5%'}}>
            <Text
              style={{
                fontSize: 22,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Chi tiết nhân viên
            </Text>
            <Text
              style={{
                marginTop: 15,
                fontSize: 19,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: '5%',
              }}>
              Họ tên
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
                paddingLeft: '5%',
              }}>
              {' '}
              {nhanVien_id.hoTen}
            </Text>

            <Text
              style={{
                marginTop: 15,
                fontSize: 19,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: '5%',
              }}>
              Email
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
                paddingLeft: '5%',
              }}>
              {' '}
              {nhanVien_id.email}
            </Text>

            <Text
              style={{
                marginTop: 15,
                fontSize: 19,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: '5%',
              }}>
              Địa chỉ :
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
                paddingLeft: '5%',
              }}>
              {' '}
              {nhanVien_id.diaChi}
            </Text>

            <Text
              style={{
                marginTop: 15,
                fontSize: 19,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: '5%',
              }}>
              Số điện thoại
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
                paddingLeft: '5%',
              }}>
              {' '}
              {nhanVien_id.dienThoai}
            </Text>

            <Text
              style={{
                marginTop: 15,
                fontSize: 19,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: '5%',
              }}>
              Ghi chú :
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
                paddingLeft: '5%',
              }}>
              {' '}
              {nhanVien_id.ghiChu}
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
              onPress={() => setModalVisible_ctnv(false)}>
              <Text style={{color: 'black', textAlign: 'center'}}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal sửa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_editnv}>
        <View
          style={{
            flex: 1,
            margin: '15%',
            borderRadius: 30,
            backgroundColor: '#fff666',
          }}>
          <View style={{padding: '8%'}}>
            <Text
              style={{
                fontSize: 22,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Sửa nhân viên
            </Text>
            <CustomTextInput
              placeholder="Tên nhân viên"
              value={hoTen}
              onChangeText={txt => setHoTen(txt)}
            />
            <CustomTextInput
              placeholder="Email"
              value={email}
              onChangeText={txt => setEmail(txt)}
            />
            <CustomTextInput
              placeholder="Tên địa chỉ"
              value={diaChi}
              onChangeText={txt => setDiaChi(txt)}
            />
            <CustomTextInput
              placeholder="Số điện thoại"
              value={dienThoai}
              onChangeText={txt => setDienThoai(txt)}
            />
            <CustomTextInput
              placeholder="Ghi chú"
              value={ghiChu}
              onChangeText={txt => setGhiChu(txt)}
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
              onPress={() => setModalVisible_editnv(false)}>
              <Text style={{color: 'black', textAlign: 'center'}}>Đóng</Text>
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
              <Text style={{color: 'black', textAlign: 'center'}}>Sửa</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal thêm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_addnv}>
        <View
          style={{
            flex: 1,
            margin: '15%',
            borderRadius: 30,
            backgroundColor: '#fff666',
          }}>
          <View style={{padding: '8%'}}>
            <Text
              style={{
                fontSize: 22,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Sửa nhân viên
            </Text>
            <CustomTextInput
              placeholder="Tên nhân viên"
              onChangeText={txt => setHoTen(txt)}
            />
            <CustomTextInput
              placeholder="Email"
              onChangeText={txt => setEmail(txt)}
            />
            <CustomTextInput
              placeholder="Tên địa chỉ"
              onChangeText={txt => setDiaChi(txt)}
            />
            <CustomTextInput
              placeholder="Số điện thoại"
              onChangeText={txt => setDienThoai(txt)}
            />
            <CustomTextInput
              placeholder="Ghi chú"
              onChangeText={txt => setGhiChu(txt)}
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
              onPress={() => setModalVisible_addnv(false)}>
              <Text style={{color: 'black', textAlign: 'center'}}>Đóng</Text>
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
              onPress={postList_nv}>
              <Text style={{color: 'black', textAlign: 'center'}}>Sửa</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuanLyNhanVien;

const styles = StyleSheet.create({});
