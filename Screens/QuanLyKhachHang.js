import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, FlatList, Alert, TextInput, Button, Modal } from 'react-native';
import axios from 'axios';
import COMMON from '../COMMON';
import CustomTextInput from '../Components/CustomTextInput';

const QuanLyKhachHang = () => {
  const [khachHangs, setKhachHangs] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddOrUpdateModal, setShowAddOrUpdateModal] = useState(false);
  const [isUpdateAction, setIsUpdateAction] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({
    id: '',
    hoTen: '',
    email: '',
    sdt: '',
    diaChi: '',
    lichSuMuaHang: [],
    thongTinThanhToan: '',
  });

  useEffect(() => {
    fetchKhachHangs();
  }, []);

  const fetchKhachHangs = async () => {
    try {
      const response = await axios.get(`http://${COMMON.ipv4}:3000/khachhangs/getKhachHang`);
      setKhachHangs(response.data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lấy dữ liệu khách hàng: ' + error.message);
    }
  };

  const handleOpenDetailsModal = (customer) => {
    setCurrentCustomer(customer);
    setShowDetailsModal(true);
  };

  const handleOpenAddOrUpdateModal = (customer = null) => {
    setCurrentCustomer(customer || {
      id: '',
      hoTen: '',
      email: '',
      sdt: '',
      diaChi: '',
      lichSuMuaHang: [],
      thongTinThanhToan: '',
    });
    setIsUpdateAction(!!customer);
    setShowAddOrUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setShowAddOrUpdateModal(false);
    setCurrentCustomer({
      id: '',
      hoTen: '',
      email: '',
      sdt: '',
      diaChi: '',
      lichSuMuaHang: [],
      thongTinThanhToan: '',
    });
  };

  const saveCustomer = async () => {
    if (!currentCustomer.hoTen || !currentCustomer.email || !currentCustomer.sdt || !currentCustomer.diaChi) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const method = isUpdateAction ? 'put' : 'post';
    const url = isUpdateAction ? `http://${COMMON.ipv4}:3000/khachhangs/updateKhachHang/${currentCustomer._id}` : `http://${COMMON.ipv4}:3000/khachhangs/addKhachHang`;

    try {
      await axios[method](url, currentCustomer);
      const successMessage = isUpdateAction ? "Cập nhật khách hàng thành công!" : "Thêm khách hàng thành công!";
      Alert.alert("Thành công", successMessage);
      fetchKhachHangs(); // Làm mới danh sách
    } catch (error) {
      const errorMessage = isUpdateAction ? "Cập nhật khách hàng không thành công: " : "Thêm khách hàng mới không thành công: ";
      Alert.alert("Lỗi", errorMessage + error.message);
    } finally {
      handleCloseModal();
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    console.log("Attempting to delete customer with ID:", customerId);
    Alert.alert("Xác nhận", "Bạn có muốn xóa khách hàng này?", [
      { text: "Không", style: "cancel" },
      {
        text: "Có", onPress: async () => {
          try {
            const response = await axios.delete(`http://${COMMON.ipv4}:3000/khachhangs/deleteKhachHang/${customerId}`);
            console.log("Delete response:", response);
            Alert.alert("Thông báo", "Khách hàng đã được xóa.");
            fetchKhachHangs(); // Làm mới danh sách sau khi
          } catch (error) {
            console.log("Error deleting customer:", error);
            Alert.alert("Lỗi", "Không thể xóa khách hàng: " + error.message);
          }
        }
      },
    ]);
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={khachHangs}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}

        renderItem={({ item }) => (

          <Pressable onPress={() => handleOpenDetailsModal(item)}>
            <View style={styles.customerItem}>
              <Image style={styles.userIcon} source={require('../img/user.png')} />
              <View>
                <Text style={styles.customerText}>{item.hoTen}</Text>
                <Text style={styles.customerText}>{item.email}</Text>
              </View>

              <View style={styles.iconsContainer}>
                <Pressable onPress={() => handleOpenAddOrUpdateModal(item)}>
                  <Image style={styles.icon} source={require('../img/edit.png')} />
                </Pressable>
                <Pressable onPress={() => handleDeleteCustomer(item._id)}>
                  <Image style={styles.icon} source={require('../img/trash.png')} />
                </Pressable>
              </View>
            </View>
          </Pressable>
        )}
      />

      <Pressable style={styles.addButton} onPress={() => handleOpenAddOrUpdateModal()}>
        <Image style={styles.icon} source={require('../img/add.png')} />
      </Pressable>

      {/* Modal Chi Tiết */}
      <Modal visible={showDetailsModal} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Họ tên: {currentCustomer.hoTen}</Text>
          <Text style={styles.modalText}>Email: {currentCustomer.email}</Text>
          <Text style={styles.modalText}>SĐT: {currentCustomer.sdt}</Text>
          <Text style={styles.modalText}>Địa Chỉ: {currentCustomer.diaChi}</Text>
          <Text style={styles.modalText}>Lịch sử: {currentCustomer.lichSuMuaHang}</Text>
          <Text style={styles.modalText}>Thông Tin: {currentCustomer.thongTinThanhToan}</Text>
          <Pressable style={{ width: 100, height: 50, backgroundColor: '#B0A4A8', justifyContent: 'center', borderRadius: 25, alignItems: 'center' }} onPress={handleCloseModal}>
              <Text style={{ color: 'black', textAlign: 'center' }}>Đóng</Text>
            </Pressable>
        </View>
      </Modal>

      {/* Modal Thêm Mới / Cập Nhật */}
      <Modal visible={showAddOrUpdateModal} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{isUpdateAction ? 'Cập nhật Khách Hàng' : 'Thêm Khách Hàng Mới'}</Text>
          {/* Form nhập liệu */}
          <CustomTextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={currentCustomer.hoTen}
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, hoTen: text })}
          />
          <CustomTextInput
            style={styles.input}
            placeholder="Email"
            value={currentCustomer.email}
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, email: text })}
          />
          <CustomTextInput
            style={styles.input}
            placeholder="SDT"
            value={currentCustomer.sdt}
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, sdt: text })}
          />
          <CustomTextInput
            style={styles.input}
            placeholder="Địa Chỉ"
            value={currentCustomer.diaChi}
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, diaChi: text })}
          />
          <CustomTextInput
            style={styles.input}
            placeholder="Lịch Sử Mua Hàng"
            value={Array.isArray(currentCustomer.lichSuMuaHang) ? currentCustomer.lichSuMuaHang.join(", ") : ''}// Nối mảng thành một chuỗi, cách nhau bởi dấu phẩy
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, lichSuMuaHang: text.split(", ") })} // Khi thay đổi, chia chuỗi thành mảng lại nếu cần
          />


          <CustomTextInput
            style={styles.input}
            placeholder="Thông Tin "
            value={currentCustomer.thongTinThanhToan}
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, thongTinThanhToan: text })}
          />
          {/* Các TextInput khác tương tự */}
          <View style={styles.buttonsContainer}>
            <Pressable style={{ width: 100, height: 50, backgroundColor: '#B0A4A8', justifyContent: 'center', borderRadius: 25, alignItems: 'center' }} onPress={handleCloseModal}>
              <Text style={{ color: 'black', textAlign: 'center' }}>Đóng</Text>
            </Pressable>
            <Pressable style={{ width: 100, height: 50, backgroundColor: '#B0A4A8', justifyContent: 'center', borderRadius: 25, alignItems: 'center' }} onPress={saveCustomer}>
              <Text style={{ color: 'black', textAlign: 'center' }}>Lưu</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  customerItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customerText: {
    color: 'black',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  userIcon: {
    width: 35,
    height: 35,
  },
  icon: {
    width: 40,
    height: 40,
    margin: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
});

export default QuanLyKhachHang;
