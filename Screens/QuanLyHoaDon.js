import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Checkbox} from 'react-native-paper';
import {StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native';
import COMMON from '../COMMON';
import {AnimatedFAB} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const QuanLyHoaDon = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [khachHangData, setKhachHangData] = useState([]);
  const [khachHangHoTen, setKhachHangHoTen] = useState('')
  const [nhanVienData, setNhanVienData] = useState([]);
  const [nhanVienHoTen, setNhanVienHoTen] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isExtended, setIsExtended] = React.useState(true);

  const onScroll = ({nativeEvent}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };
  const toggleAddDialog = value => {
    setShowAddDialog(value);
  };

  const fabStyle = {right: 16, bottom: 16};

  const getSpinnerKhachHang = async () => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/khachhangs/getKhachHang`,
      );
      const json = await response.json();
      console.log(json);
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
      console.log(json);
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
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getHoaDon();
    getSpinnerKhachHang();
    getSpinnerNhanVien();
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
        <View style={styles.khungDialog}>
          <View style={styles.dialog}>
            <Text>Đây là Dialog mở đầu</Text>
            <Picker
              selectedValue={nhanVienHoTen}
              onValueChange={(itemValue, itemIndex) =>
                setNhanVienHoTen(itemValue)
              }>
              {nhanVienData.map((nhanVien, index) => (
                <Picker.Item
                  key={index}
                  label={nhanVien.hoTen}
                  value={nhanVien.id}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={khachHangHoTen}
              onValueChange={(itemValue, itemIndex) =>
                setKhachHangHoTen(itemValue)
              }>
              {khachHangData.map((khachHang, index) => (
                <Picker.Item
                  key={index}
                  label={khachHang.hoTen}
                  value={khachHang.id}
                />
              ))}
            </Picker>
            <Button
              title="Đóng dialog"
              onPress={() => setShowAddDialog(false)}
            />
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
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    marginBottom: 3,
  },
  emptyText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  fabStyle: {
    position: 'absolute',
  },
  fabLabel: {
    fontSize: 16,
  },
  fabContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  khungDialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  dialog: {
    width: 300,
    height: 200,
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 10,
    opacity: 1,
  },
});
