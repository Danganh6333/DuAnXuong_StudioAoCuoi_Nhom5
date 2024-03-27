import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, Alert, Modal, Button, TextInput } from 'react-native';

const mockCustomers = [
  // Giả định dữ liệu khách hàng mẫu
  {
    id: '1',
    hoTen: 'Khách hàng 1',
    email: 'kh1@gmail.com',
    sdt: '0123456789',
    diaChi: '123 Đường ABC, Quận 1, TP.HCM',
    lichSuMuaHang: 'Mua 2 sản phẩm ngày 01/01/2024',
    thongTinThanhToan: 'Thanh toán qua thẻ ngân hàng',
  },
  // Thêm dữ liệu khách hàng mẫu ở đây
];

const QuanLyKhachHang = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddOrUpdateModal, setShowAddOrUpdateModal] = useState(false);
  const [isUpdateAction, setIsUpdateAction] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const handleOpenDetailsModal = (customer) => {
    setCurrentCustomer(customer);
    setShowDetailsModal(true);
  };

  const handleOpenAddOrUpdateModal = (customer = null) => {
    setCurrentCustomer(customer);
    setIsUpdateAction(customer !== null);
    setShowAddOrUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setShowAddOrUpdateModal(false);
    setCurrentCustomer(null);
  };

  const handleDeleteCustomer = (customerId) => {
    Alert.alert("Xác nhận", "Bạn có muốn xóa khách hàng này?", [
      { text: "Không", style: "cancel" },
      { text: "Có", onPress: () => console.log("Đã xóa", customerId) },
    ]);
  };

  // Hàm lưu thay đổi (Thêm mới hoặc Cập nhật)
  const saveCustomer = () => {
    if (isUpdateAction) {
      console.log("Cập nhật khách hàng", currentCustomer);
    } else {
      console.log("Thêm mới khách hàng", currentCustomer);
    }
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {mockCustomers.map((customer, index) => (
          <Pressable key={index} onPress={() => handleOpenDetailsModal(customer)}>
            <View style={styles.customerItem}>
            <Image style={styles.userIcon} source={require('../img/user.png')} />
              <View>
                <Text style={styles.customerText}>{customer.hoTen}</Text>
                <Text style={styles.customerText}>{customer.email}</Text>
              </View>
              
              <View style={styles.iconsContainer}>
                <Pressable onPress={() => handleOpenAddOrUpdateModal(customer)}>
                  <Image style={styles.icon} source={require('../img/edit.png')} />
                </Pressable>
                <Pressable onPress={() => handleDeleteCustomer(customer.id)}>
                  <Image style={styles.icon} source={require('../img/trash.png')} />
                </Pressable>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable style={styles.addButton} onPress={() => handleOpenAddOrUpdateModal()}>
        <Image style={styles.icon} source={require('../img/add.png')} />
      </Pressable>
      
      {/* Modal Chi Tiết */}
      <Modal visible={showDetailsModal} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          {/* Hiển thị thông tin chi tiết của khách hàng */}
          <Text style={styles.modalText}>Họ tên: {currentCustomer?.hoTen}</Text>
          <Text style={styles.modalText}>Email: {currentCustomer?.email}</Text>
          <Text style={styles.modalText}>SĐT: {currentCustomer?.sdt}</Text>
          <Text style={styles.modalText}>Địa Chỉ: {currentCustomer?.diaChi}</Text>
          <Text style={styles.modalText}>Lịch sử: {currentCustomer?.lichSuMuaHang}</Text>
          <Text style={styles.modalText}>Thông Tin: {currentCustomer?.thongTinThanhToan}</Text>
          {/* Hiển thị các thông tin khác */}
          <Button title="Đóng" onPress={handleCloseModal} />
        </View>
      </Modal>

      {/* Modal Thêm Mới / Cập Nhật */}
      <Modal visible={showAddOrUpdateModal} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
                    {/* Form nhập liệu cho việc thêm mới hoặc cập nhật */}
                    <Text style={styles.modalTitle}>{isUpdateAction ? 'Cập nhật Khách Hàng' : 'Thêm Khách Hàng Mới'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={currentCustomer?.hoTen}
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, hoTen: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={currentCustomer?.email}
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="SĐT"
            value={currentCustomer?.sdt}
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, sdt: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Địa Chỉ"
            value={currentCustomer?.diaChi}
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, diaChi: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Lịch Sử"
            value={currentCustomer?.lichSuMuaHang}
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, lichSuMuaHang: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Thông tin"
            value={currentCustomer?.thongTinThanhToan}
            onChangeText={(text) => setCurrentCustomer({ ...currentCustomer, thongTinThanhToan: text })}
          />
          {/* Thêm các trường input khác tương tự ở đây */}
          <View style={styles.buttonsContainer}>
            <Button title="Hủy" onPress={handleCloseModal} />
            <Button title="Lưu" onPress={saveCustomer} />
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
