import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  Button,
  Alert,
  TextInput,
  Switch,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import COMMON from '../COMMON';
import {AnimatedFAB} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Item = ({item, toggleUpdateDialog, toggleDeleteDialog}) => (
  <TouchableOpacity style={styles.itemContainer}>
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{item.tenDichVu}</Text>
      <Text style={styles.itemPrice}>{item.giaTien.toLocaleString()} VNĐ</Text>
    </View>
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Text style={styles.itemDescription}>{item.moTa}</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => toggleDeleteDialog(item._id)}>
          <AntDesign name="close" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => toggleUpdateDialog(item)}>
          <AntDesign name="form" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

const QuanLyDanhSachDichVu = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acesnding, setacesnding] = useState('');
  const [isExtended, setIsExtended] = React.useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tenDichVu, setTenDichVu] = useState('');
  const [trangThai, setTrangThai] = useState(0);
  const [moTa, setMoTa] = useState('');
  const [giaTien, setGiaTien] = useState('');
  const [updateTenDichVu, setUpdateTenDichVu] = useState('');
  const [updateTrangThai, setUpdateTrangThai] = useState(0);
  const [updateMoTa, setUpdateMoTa] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [updateGiaTien, setUpdateGiaTien] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const getDanhSachDichVu = async () => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/dichvus/getDichVu`,
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
    getDanhSachDichVu();
  }, []);

  const onScroll = ({nativeEvent}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const XoaDichVu = async () => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/dichvus/deleteDichVu/${selectedItemId}`,
        {method: 'DELETE'},
      );
      if (response.ok) {
        Alert.alert('Xóa thành công');
        getDanhSachDichVu();
      } else {
        Alert.alert('Xóa không thành công');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Xóa không thành công');
    } finally {
      setShowDeleteDialog(false);
    }
  };
  const ThemDichVu = () => {
    let url_api_add = `http://${COMMON.ipv4}:3000/dichvus/addDichVu/`;
    let obj = {
      tenDichVu: tenDichVu,
      trangThai: trangThai,
      moTa: moTa,
      giaTien: giaTien,
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
  const CapNhatDichVu = () => {
    const updatedItem = {
      tenDichVu: updateTenDichVu,
      trangThai: updateTrangThai,
      moTa: updateMoTa,
      giaTien: updateGiaTien,
    };

    fetch(`http://${COMMON.ipv4}:3000/dichvus/updateDichVu/${selectedItemId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Updated successfully', data);
        console.log('SSSS' + selectedItemId);
        setShowUpdateDialog(false);
        getDanhSachDichVu();
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };
  const toggleAddDialog = value => {
    setShowAddDialog(value);
  };

  const toggleUpdateDialog = item => {
    setShowUpdateDialog(true);
    setSelectedItemId(item._id);
    setUpdateTenDichVu(item.tenDichVu);
    setUpdateTrangThai(item.trangThai);
    setUpdateMoTa(item.moTa);
    setUpdateGiaTien(item.giaTien);
    setIsEnabled(item.trangThai === 1);
  };
  const toggleDeleteDialog = item => {
    setSelectedItemId(item);
    setShowDeleteDialog(true);
  };

  const fabStyle = {right: 16, bottom: 16};
  return (
    <View style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
      {loading ? (
        <ActivityIndicator animating={true} color="#2aa198" />
      ) : (
        <FlatList
          data={data}
          onScroll={onScroll}
          renderItem={({item}) => (
            <Item
              item={item}
              toggleAddDialog={toggleAddDialog}
              toggleUpdateDialog={toggleUpdateDialog}
              toggleDeleteDialog={toggleDeleteDialog}
              updateTenDichVu={updateTenDichVu}
              setUpdateTenDichVu={setUpdateTenDichVu}
              updateMoTa={updateMoTa}
              setUpdateMoTa={setUpdateMoTa}
              updateGiaTien={updateGiaTien}
              setUpdateGiaTien={setUpdateGiaTien}
            />
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
      <Modal visible={showUpdateDialog} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sửa Dịch Vụ</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên Dịch Vụ"
              value={updateTenDichVu}
              onChangeText={txt => setUpdateTenDichVu(txt)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mô Tả"
              value={updateMoTa}
              onChangeText={txt => setUpdateMoTa(txt)}
            />
            <TextInput
              style={styles.input}
              placeholder="Giá Tiền"
              value={updateGiaTien.toString()}
              onChangeText={txt => setUpdateGiaTien(txt)}
              keyboardType="numeric"
            />
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Trạng Thái</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                value={isEnabled}
                onValueChange={value => {
                  setIsEnabled(value); 
                  setUpdateTrangThai(value ? 1 : 0); 
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Đóng" onPress={() => setShowUpdateDialog(false)} />
              <Button title="Sửa" onPress={CapNhatDichVu} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={showAddDialog} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm Dịch Vụ Mới</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên Dịch Vụ"
              onChangeText={txt => setTenDichVu(txt)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mô Tả"
              onChangeText={txt => setMoTa(txt)}
            />
            <TextInput
              style={styles.input}
              placeholder="Giá Tiền"
              onChangeText={txt => setGiaTien(txt)}
              keyboardType="numeric"
            />
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Trạng Thái</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                value={updateTrangThai}
                onValueChange={value => {
                  setIsEnabled(value);
                  setTrangThai(value ? 1 : 0);
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Đóng" onPress={() => setShowAddDialog(false)} />
              <Button title="Thêm" onPress={ThemDichVu} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={showDeleteDialog} transparent={true}>
        <View style={styles.khungDialog}>
          <View style={styles.dialogDelete}>
            <Text style={styles.dialogTitleDelete}>Xác nhận xóa</Text>
            <Text style={styles.dialogTextDelete}>
              Bạn có chắc chắn muốn xóa dịch vụ này?
            </Text>
            <View style={styles.dialogButtonsDelete}>
              <TouchableOpacity
                style={styles.dialogButtonDelete}
                onPress={() => setShowDeleteDialog(false)}>
                <Text style={styles.dialogButtonTextDelete}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dialogButtonDelete, styles.deleteButton]}
                onPress={XoaDichVu}>
                <Text
                  style={[
                    styles.dialogButtonTextDelete,
                    styles.deleteButtonTextDelete,
                  ]}>
                  Xóa
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flatListContent: {
    paddingBottom: 80,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 17,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 15,
    borderRadius: 13,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#0f1525',
    color: '#FFFFFF',
  },
  itemDescription: {
    fontSize: 14,
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
  iconButton: {
    borderRadius: 20,
    backgroundColor: '#CCCCCC',
    padding: 8,
    marginHorizontal: 5,
  },
  icon: {
    fontSize: 20,
  },
  khungApp: {
    flex: 1,
  },
  khungDialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  dialogDelete: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  dialogTitleDelete: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dialogTextDelete: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  dialogButtonsDelete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dialogButtonDelete: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dialogButtonTextDelete: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    marginLeft: 10,
  },
  deleteButtonTextDelete: {
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default QuanLyDanhSachDichVu;
