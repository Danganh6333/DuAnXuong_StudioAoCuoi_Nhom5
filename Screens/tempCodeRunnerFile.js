import React, { useState, useEffect } from 'react'
import { Modal, StyleSheet, Text, View, Image, ScrollView, Pressable, FlatList, Alert } from 'react-native'
import axios from 'axios';
import CustomTextInput from '../Components/CustomTextInput';
import Button from '../Components/Button';
const QuanLyNhanVien = () => {

  const [nhanVien, setNhanVien] = useState([]);
  const [nhanVien_id, setNhanVien_id] = useState({});
  const [modalVisible_ctnv, setModalVisible_ctnv] = useState(false);
  const [modalVisible_editnv, setModalVisible_editnv] = useState(false);
  const [_id, set_id] = useState('')
  const [hoTen, setHoTen] = useState('')
  const [email, setEmail] = useState('');
  //const [tenNguoiDung, setTenNguoiDung] = useState(nhanVien_id.tenNguoiDung);
  // const [matKhau, setMatKhau] = useState('nhanvien01');
   const [diaChi, setDiaChi] = useState('nhanvien01');
  const [dienThoai, setDienThoai] = useState('');
  const [ghiChu, setGhiChu] = useState('');
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
     var id = _id
     var obj = { hoTen, email, diaChi, dienThoai, ghiChu };
  
    try {
      await axios.put(`http://192.168.2.102:3000/nhanviens/updateNhanVien/${id}`, obj); 
      getList_nv();
    } catch (error) {
      console.error(error);
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
        <View style={{ backgroundColor: '#6671D7', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image style={{ width: 35, height: 35 }} source={require('../img/user.png')} />
          <View>
            <Text style={{ color: 'black' }}>{item.hoTen}</Text>
            <Text style={{ color: 'black' }}>{item.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
          <Pressable onPress={() => {
            setModalVisible_editnv(true)
        //  setNhanVien_id(item);
        set_id(item._id)
            setHoTen(item.hoTen);
            setEmail(item.email)
            setDiaChi(item.diaChi)
            setDienThoai(item.dienThoai)
            setGhiChu(item.ghiChu)
      }}>
          <Image style={{ width: 35, height: 35 }} source={require('../img/edit.png')} />
      </Pressable>
            <Image style={{ width: 35, height: 35 }} source={require('../img/trash.png')} />
          </View>
        </View>
        <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
        </View>
      </Pressable>
    )
  }
  return (
    <View style={{ backgroundColor: 'red', flex: 1 }}>
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
      <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
        <Image style={{ width: 40, height: 40 }} source={require('../img/add.png')} />
      </View>
 {/* Box 4 () */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_ctnv}>
       <View      style={{flex:1,margin:'15%',borderRadius:30,  backgroundColor: '#fff666' }}>
  <ScrollView style={{ maxHeight: '87%' ,paddingTop:'5%'}}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_editnv}>
       <View style={{flex:1,margin:'15%',borderRadius:30,  backgroundColor: '#fff666' }}>
<View style={{padding:'8%'}}>
<Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Sửa nhân viên</Text>
   <CustomTextInput
            placeholder="Tên nhân viên"
            value={hoTen}
            onChangeText={(txt)=> setHoTen(txt)}
          />
            <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={(txt)=> setHoTen(txt)}
          />
            <CustomTextInput
            placeholder="Tên Đăng Nhập"
            value={diaChi}
            onChangeText={(txt)=> setHoTen(txt)}
          />
            <CustomTextInput
            placeholder="Tên Đăng Nhập"
            value={dienThoai}
            onChangeText={(txt)=> setHoTen(txt)}
          />
            <CustomTextInput
            placeholder="Tên Đăng Nhập"
            value={ghiChu}
            onChangeText={(txt)=> setHoTen(txt)}
          />
</View>
      
<View style={{flexDirection:'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', }}>
<Pressable style={{ width: 100, height: 50, backgroundColor: '#B0A4A8', justifyContent: 'center', borderRadius: 25, alignItems: 'center' }} onPress={() => setModalVisible_editnv(false)}>

  <Text style={{ color: 'black', textAlign: 'center' }}>Đóng</Text>
</Pressable>
<Pressable style={{ width: 100, height: 50, backgroundColor: '#B0A4A8', justifyContent: 'center', borderRadius: 25, alignItems: 'center' }} onPress={putList_nv}>

<Text style={{ color: 'black', textAlign: 'center' }}>Sửa</Text>
</Pressable>
</View>
       </View>
      </Modal>
    </View>
  );
};

export default QuanLyNhanVien;

const styles = StyleSheet.create({});
