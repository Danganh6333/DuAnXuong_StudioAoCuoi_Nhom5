import React, { useState, useEffect } from 'react'
import { Modal, StyleSheet, Text, View, Image, ScrollView, Pressable, FlatList, Alert } from 'react-native'
import axios from 'axios';
import { Swipeable } from 'react-native-gesture-handler';
import CustomTextInput from '../Components/CustomTextInput';
import Button from '../Components/Button';
const QuanLyNhanVien = () => {

  const [nhanVien, setNhanVien] = useState([]);
  const [nhanVien_id, setNhanVien_id] = useState({});
  const [modalVisible_ctnv, setModalVisible_ctnv] = useState(false);
  const [modalVisible_editnv, setModalVisible_editnv] = useState(false);
  const [modalVisible_addnv, setModalVisible_addnv] = useState(false);
  const [modalVisible_delenv, setModalVisible_Delenv] = useState(false);
  const [modalVisible_isempty, setModalVisible_Isempty] = useState(false);
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [_id, set_id] = useState('')
  const [hoTen, setHoTen] = useState('')
  const [email, setEmail] = useState('');
  const [tenNguoiDung, setTenNguoiDung] = useState('nhanvien01');
  const [matKhau, setMatKhau] = useState('nhanvien01');
  const [diaChi, setDiaChi] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const isValidEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };
  
  const isValidDienThoai = (dienThoai) => {
    const regex = /^\d{10}$/;
    return regex.test(dienThoai);
  };
  const getList_nv = async () => {
    try {
      const response = await axios.get('http://192.168.2.102:3000/nhanviens/getNhanVien');
      setNhanVien(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getList_nv()
  }, []);

  const putList_nv = async () => {
    let id = _id; // Use the stored ID for the update request
    if (!isValidEmail(email)) {
      Alert.alert('Email không hợp lệ!');
      return;
    }
    else if(!isValidDienThoai(dienThoai)){
      Alert.alert('Số diện thoại không hợp lệ!');
      return;
   
    }


    if (!id || !hoTen || !email || !diaChi || !dienThoai) {
      setModalVisible_Isempty(true)
      return; // Prevent update if required fields are empty
    }
    const obj = { hoTen, email, diaChi, dienThoai, ghiChu };
    try {
      await axios.put(`http://192.168.2.102:3000/nhanviens/updateNhanVien/${id}`, obj);
      getList_nv(); // Refetch employee list after successful update
      setModalVisible_editnv(false); // Close edit modal
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi!', 'Có lỗi xảy ra khi sửa nhân viên!'); // Inform user about update error
    }
  };
  const postList_nv = async () => {
    if (!hoTen || !email || !diaChi || !dienThoai) {
      setModalVisible_Isempty(true);
      return; // Prevent update if required fields are empty
    }
  
    

    
    const obj = { hoTen, tenNguoiDung, matKhau, email, diaChi, dienThoai, ghiChu };

    try {
      await axios.post('http://192.168.2.102:3000/nhanviens/addNhanVien', obj);
      getList_nv(); // Refetch employee list after successful update
      setHoTen('')
      setEmail('')
      setDiaChi('')
      setDienThoai('')
      setGhiChu('')
      setModalVisible_addnv(false); // Close edit modal
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi!', 'Có lỗi xảy ra khi thêm nhân viên!'); // Inform user about update error
    }
  };
  const deleList_nv = async () => {
    let id = _id;
  console.log(id);
    // Check if _id is empty
    if (!id) {
      Alert.alert('Lỗi!', 'Vui lòng chọn nhân viên cần xóa!');
      return;
    }
  
    try {
      const response = await axios.delete(`http://192.168.2.102:3000/nhanviens/deleteNhanVien/${id}`);
     response.data.success 
       getList_nv();
      setModalVisible_Delenv(false)
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi!', 'Có lỗi xảy ra khi xóa nhân viên!');
    }
  };
  const renderItem = ({ item }) => {

    return (
      <Pressable onPress={() => {
        setModalVisible_ctnv(true);
        setNhanVien_id(item);
      }}>
        <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
        </View>
        <View style={{ backgroundColor: '#fff', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image style={{ width: 35, height: 35, tintColor: '#70cbff' }} source={require('../img/user.png')} />
          <View>
            <Text style={{ color: 'black' }}>{item.hoTen}</Text>
            <Text style={{ color: 'black' }}>{item.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <Pressable onPress={() => {
              setModalVisible_editnv(true)
              set_id(item._id)
              setHoTen(item.hoTen);
              setEmail(item.email)
              setDiaChi(item.diaChi)
              setDienThoai(item.dienThoai)
              setGhiChu(item.ghiChu)
            }}>
              <Image style={{ width: 35, height: 35, tintColor: '#70cbff' }} source={require('../img/edit.png')} />
            </Pressable>
            <Pressable onPress={() =>{
             setModalVisible_Delenv(true)
             set_id(item._id)
             }     }>
              <Image style={{ width: 35, height: 35, tintColor: 'red' }} source={require('../img/trash.png')} />
            </Pressable>
            
          </View>
        </View>
        <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
        </View>
      </Pressable>

    )
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Box 1 (Optional header) */}
      {/* <View style={{ ... }}>
        {/* Header content */}
      {/* </View> */}

      {/* Box 2 (Employee list) */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={nhanVien}
          keyExtractor={(item_nv) => item_nv._id}
          renderItem={renderItem}
        />
      </View>

      {/* Box 3 (Add employee button) */}
      <Pressable onPress={() => setModalVisible_addnv(true)}>
        <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
          <Image style={{ width: 40, height: 40 }} source={require('../img/add.png')} />
        </View>
      </Pressable>
      {/* Modal chi tiết */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_ctnv}>
        <View style={{ flex: 0.8, margin: '15%', borderRadius: 30, backgroundColor: '#70cbff' }}>
          <ScrollView style={{ maxHeight: '87%', paddingTop: '5%' }}>
            <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Chi tiết nhân viên</Text>
            <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Họ tên</Text>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>  {nhanVien_id.hoTen}</Text>

            <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Email</Text>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>   {nhanVien_id.email}</Text>

            <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Địa chỉ :</Text>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>  {nhanVien_id.diaChi}</Text>

            <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Số điện thoại</Text>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>  {nhanVien_id.dienThoai}</Text>

            <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Ghi chú :</Text>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>  {nhanVien_id.ghiChu}</Text>


          </ScrollView>

          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
            <Pressable style={{ width: 160, height: 50, backgroundColor: '#B0A4A8', justifyContent: 'center', borderRadius: 25, alignItems: 'center' }} onPress={() => setModalVisible_ctnv(false)}>

              <Text style={{ color: 'black', textAlign: 'center' }}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal sửa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_editnv}>
        <View style={{ flex: 0.8, margin: '15%', borderRadius: 30, backgroundColor: '#70cbff' }}>
          <View style={{ padding: '8%' }}>
            <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Sửa nhân viên</Text>
            <CustomTextInput
              placeholder="Tên nhân viên"
              value={hoTen}
              onChangeText={(txt) => setHoTen(txt)}
            />
            <CustomTextInput
              placeholder="Email"
              value={email}
              onChangeText={(txt) => setEmail(txt)}
            />
            <CustomTextInput
              placeholder="Tên địa chỉ"
              value={diaChi}
              onChangeText={(txt) => setDiaChi(txt)}
            />
            <CustomTextInput
              placeholder="Số điện thoại"
              value={dienThoai}
              onChangeText={(txt) => setDienThoai(txt)}
            />
            <CustomTextInput
              placeholder="Ghi chú"
              value={ghiChu}
              onChangeText={(txt) => setGhiChu(txt)}
            />
          </View>

          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', }}>
            <Pressable style={{ width: 100, height: 50, backgroundColor: '#B0A4A8', justifyContent: 'center', borderRadius: 25, alignItems: 'center' }} onPress={() => setModalVisible_editnv(false)}>

              <Text style={{ color: 'black', textAlign: 'center' }}>Đóng</Text>
            </Pressable>
            <Pressable style={{ width: 100, height: 50, backgroundColor: '#B0A4A8', justifyContent: 'center', borderRadius: 25, alignItems: 'center' }} onPress={putList_nv}>

              <Text style={{ color: 'black', textAlign: 'center' }}>Sửa</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal thêm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_addnv} >

        <View style={{ flex: 0.8, margin: '15%', borderRadius: 30, backgroundColor: '#70cbff' }}>
          <View style={{ padding: '8%' }}>
            <Text style={{ margin: '5%', fontSize: 22, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Thêm nhân viên</Text>
            <CustomTextInput
              placeholder="Tên nhân viên"
              onChangeText={(txt) => setHoTen(txt)}
            />
            <CustomTextInput
              placeholder="Email"
              onChangeText={(txt) => setEmail(txt)}
            />
            <CustomTextInput
              placeholder="Tên địa chỉ"
              onChangeText={(txt) => setDiaChi(txt)}
            />
            <CustomTextInput
              placeholder="Số điện thoại"
              onChangeText={(txt) => setDienThoai(txt)}
            />
            <CustomTextInput
              placeholder="Ghi chú"
              onChangeText={(txt) => setGhiChu(txt)}
            />
          </View>

          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', }}>
            <Pressable style={{ width: 100, height: 50, backgroundColor: '#B0A4A8', justifyContent: 'center', borderRadius: 25, alignItems: 'center' }} onPress={() => setModalVisible_addnv(false)}>

              <Text style={{ color: 'black', textAlign: 'center' }}>Đóng</Text>
            </Pressable>
            <Pressable style={{ width: 100, height: 50, backgroundColor: '#B0A4A8', justifyContent: 'center', borderRadius: 25, alignItems: 'center' }} onPress={postList_nv}>

              <Text style={{ color: 'black', textAlign: 'center' }}>Thêm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
          }}
        >
          <View
            style={{
              backgroundColor: '#0C0F14',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              width: '80%',
            }}
          >
            <Text style={{ color: '#FFFFFF', marginBottom: 10 }}>
              Vui lòng điền đẩy đủ thông tin
            </Text>
            <Pressable
              onPress={() => {
                setModalVisible_Isempty(false)
              }}
              style={{
                padding: 10,
                width: 120,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
            >
              <Text style={{ color: '#70cbff', fontSize: 15, fontWeight: 'bold' }}>
                Đóng
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_delenv}
      //   onRequestClose={close_Modal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#0C0F14',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              width: '80%',
            }}
          >
            <Text style={{ color: '#FFFFFF', marginBottom: 10 }}>
              Bạn chắc chắn muốn xóa nhân viên?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Pressable
                onPress={() => {
                  setModalVisible_Delenv(false)
                }}
                style={{
                  padding: 10,
                  width: 120,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: '#FFFFFF' }}>Không</Text>
              </Pressable>
              <Pressable
                onPress={deleList_nv}
                style={{
                  padding: 10,
                  width: 120,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' }}>
                  Có
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuanLyNhanVien;

const styles = StyleSheet.create({});
