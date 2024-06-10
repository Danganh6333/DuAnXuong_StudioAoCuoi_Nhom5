import React, { useCallback, useEffect, useState } from 'react';
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
  ScrollView,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import COMMON from '../COMMON';
import { AnimatedFAB } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import { Chip } from 'react-native-paper';

const Item = ({ item, toggleUpdateDialog, toggleDeleteDialog }) => (
  <TouchableOpacity style={styles.itemContainer}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.anhDichVu }} style={styles.itemImage} />
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Tên Dịch Vụ {item.tenDichVu}</Text>
      <Text style={styles.description}>Mô Tả {item.moTa}</Text>
      <Text style={styles.price}>
        Giá Tiền {item.giaTien.toLocaleString()} VNĐ
      </Text>
    </View>
    <View style={styles.iconContainer}>
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
  </TouchableOpacity>
);

const QuanLyDanhSachDichVu = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExtended, setIsExtended] = React.useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tenDichVu, setTenDichVu] = useState('');
  const [trangThai, setTrangThai] = useState(0);
  const [moTa, setMoTa] = useState('');
  const [selectedChip, setSelectedChip] = useState(null);

  const [updateLoaiDichVu, setUpdateLoaiDichVu] = useState(0);
  const [giaTien, setGiaTien] = useState('');
  const [updateAnhDichVu, setUpdateAnhDichVu] = useState('');
  const [loaiDichVu, setLoaiDichVu] = useState(0)
  const [anhDichVu, setAnhDichVu] = useState('');
  const [updateTenDichVu, setUpdateTenDichVu] = useState('');
  const [updateTrangThai, setUpdateTrangThai] = useState(0);
  const [updateMoTa, setUpdateMoTa] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [updateHoanThanh, setupdateHoanThanh] = useState('')
  const [updateGiaTien, setUpdateGiaTien] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [focusedButton, setFocusedButton] = useState(null);
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

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const XoaDichVu = async () => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/dichvus/deleteDichVu/${selectedItemId}`,
        { method: 'DELETE' },
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
  const chooseImage = useCallback(() => {
    let options = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets.length > 0
      ) {
        setAnhDichVu(response.assets[0].uri);
      } else {
        console.log('User canceled image picker or encountered an error');
      }
    });
  }, []);
  const chooseImageEdit = useCallback(() => {
    let options = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets.length > 0
      ) {
        setUpdateAnhDichVu(response.assets[0].uri);
      } else {
        console.log('User canceled image picker or encountered an error');
      }
    });
  }, []);
  const CapNhatDichVu = () => {
    let formData = new FormData();
    formData.append('tenDichVu', updateTenDichVu);
    formData.append('trangThai', updateTrangThai);
    formData.append('loaiDichVu', updateLoaiDichVu);
    formData.append('moTa', updateMoTa);
    formData.append('giaTien', updateGiaTien);
    formData.append('anhDichVu', {
      uri: updateAnhDichVu,
      type: 'image/jpeg',
      name: 'anhDichVu.jpg',
    });

    fetch(
      `http://${COMMON.ipv4}:3000/dichvus/updateDichVu/${selectedItemId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }
    )
      .then((response) => {
        if (response.ok) {
          Alert.alert('Cập nhật thành công');
          setShowUpdateDialog(false);
          getDanhSachDichVu();
        } else {
          Alert.alert('Cập nhật không thành công');
        }
      })
      .catch((error) => {
        console.error('Error updating service:', error);
        Alert.alert('Cập nhật không thành công');
      });
  };
  const ThemDichVu = () => {
    let url_api_add = `http://${COMMON.ipv4}:3000/dichvus/addDichVuWithImage`;
    let formData = new FormData();
    formData.append('tenDichVu', tenDichVu);
    formData.append('trangThai', trangThai);
    formData.append('loaiDichVu', loaiDichVu);
    formData.append('moTa', moTa);
    formData.append('giaTien', giaTien);
    formData.append('anhDichVu', {
      uri: anhDichVu,
      type: 'image/jpeg',
      name: 'anhDichVu.jpg',
    });

    fetch(url_api_add, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(res => {
        if (res.ok) {
          Alert.alert('Thêm thành công');
          setShowAddDialog(false);
          getDanhSachDichVu();
        }
      })
      .catch(err => {
        console.log('Lỗi Thêm Dịch Vụ', err);
      });
  }

  const toggleAddDialog = value => {
    setShowAddDialog(value);
  };

  const toggleUpdateDialog = item => {
    setShowUpdateDialog(true);
    setSelectedItemId(item._id);
    setUpdateTenDichVu(item.tenDichVu);
    setUpdateTrangThai(item.trangThai);
    setUpdateMoTa(item.moTa);
    setUpdateLoaiDichVu(item.loaiDichVu);
    setUpdateAnhDichVu(item.anhDichVu);
    setUpdateGiaTien(item.giaTien);
    setIsEnabled(item.trangThai === 1);
  };
  const toggleDeleteDialog = item => {
    setSelectedItemId(item);
    setShowDeleteDialog(true);
  };
  const searchByPriceRange = async (startPrice, endPrice) => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/dichvus/searchDichVuByPrice?giaTien_start=${startPrice}&giaTien_end=${endPrice}`,
      );
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const searchByType = async type => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/dichvus/searchDichVuByType?loaiDichVu=${type}`,
      );
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Call searchByType when the selected service type changes
  useEffect(() => {
    if (selectedServiceType !== null) {
      setLoading(true);
      searchByType(selectedServiceType);
    }
  }, [selectedServiceType]);

  // const handlePriceRangeButton = (startPrice, endPrice) => {
  //   setLoading(true);
  //   searchByPriceRange(startPrice, endPrice);
  //   setFocusedButton({ startPrice, endPrice });
  // };
  const fabStyle = { right: 16, bottom: 16 };
  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      <View style={styles.buttonGroup}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={{ height: 38 }}>
          <TouchableOpacity
            style={[
              styles.button,
              focusedButton === null && styles.focusedButton,
            ]}
            onPress={() => {
              getDanhSachDichVu();
              setFocusedButton(null);
            }}>
            <Text
              style={[
                styles.buttonText,
                focusedButton === null && styles.focusedButtonText,
              ]}>
              Tất Cả
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, focusedButton === 0 && styles.focusedButton]}
            onPress={() => {
              setSelectedServiceType(0);
              setFocusedButton(0);
            }}>
            <Text
              style={[
                styles.buttonText,
                focusedButton === 0 && styles.focusedButtonText,
              ]}>
              Dịch Vụ Đơn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, focusedButton === 1 && styles.focusedButton]}
            onPress={() => {
              setSelectedServiceType(1);
              setFocusedButton(1);
            }}>
            <Text
              style={[
                styles.buttonText,
                focusedButton === 1 && styles.focusedButtonText,
              ]}>
              Dịch Vụ Theo Gói
            </Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
      {loading ? (
        <ActivityIndicator animating={true} color="#2aa198" />
      ) : (
        <FlatList
          data={data}
          onScroll={onScroll}
          renderItem={({ item }) => (
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
      <Modal visible={showUpdateDialog} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sửa Dịch Vụ</Text>
            <Image source={{ uri: updateAnhDichVu }} style={styles.modalImage} />
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
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                value={isEnabled}
                onValueChange={value => {
                  setIsEnabled(value);
                  setUpdateTrangThai(value ? 1 : 0);
                }}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 23,
                alignItems: 'center',
                gap: 5,
              }}>
              <Text>Loại Dịch Vụ : </Text>
              <Chip
                mode="outlined"
                style={selectedChip === 0 ? styles.selectedChip : null}
                onPress={() => {
                  setLoaiDichVu(0);
                  setSelectedChip(0);
                }}>
                Dịch Vụ Đơn
              </Chip>
              <Chip
                mode="outlined"
                style={selectedChip === 1 ? styles.selectedChip : null}
                onPress={() => {
                  setLoaiDichVu(1);
                  setSelectedChip(1);
                }}>
                Dịch Vụ Gói
              </Chip>
            </View>
            <TouchableOpacity
              style={styles.chooseImageButton}
              onPress={chooseImageEdit}>
              <Text style={styles.chooseImageText}>Chọn ảnh</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowUpdateDialog(false)}>
                <Text style={styles.buttonText}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={CapNhatDichVu}>
                <Text style={styles.buttonText}>Sửa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={showAddDialog} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm Dịch Vụ Mới</Text>
            {anhDichVu && (
              <Image source={{ uri: anhDichVu }} style={styles.modalImage} />
            )}
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
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                value={isEnabled}
                onValueChange={value => {
                  setIsEnabled(value);
                  setTrangThai(value ? 1 : 0);
                }}
              />
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 23,
                alignItems: 'center',
                gap: 5,
              }}>
              <Text>Loại Dịch Vụ : </Text>
              <Chip
                mode="outlined"
                style={selectedChip === 0 ? styles.selectedChip : null}
                onPress={() => {
                  setLoaiDichVu(0);
                  setSelectedChip(0);
                }}>
                Dịch Vụ Đơn
              </Chip>
              <Chip
                mode="outlined"
                style={selectedChip === 1 ? styles.selectedChip : null}
                onPress={() => {
                  setLoaiDichVu(1);
                  setSelectedChip(1);
                }}>
                Dịch Vụ Gói
              </Chip>
            </View>
            <TouchableOpacity
              style={styles.chooseImageButton}
              onPress={chooseImage}>
              <Text style={styles.chooseImageText}>Upload file ảnh</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddDialog(false)}>
                <Text style={styles.buttonText}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={ThemDichVu}>
                <Text style={styles.buttonText}>Thêm</Text>
              </TouchableOpacity>
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
  focusedButton: {
    backgroundColor: '#C8A2C8',
  },
  focusedButtonText: {
    color: '#FFFFFF',
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
    justifyContent: 'center',
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
  buttonGroup: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#0e9aa7',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#cccccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemImage: {
    width: 200,
    height: 200,
    resizeMode: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 2,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#251e3e',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#251e3e',
    marginTop: 5,
  },
  selectedChip: {
    borderWidth: 2,
    borderColor: '#0e9aa7',
    backgroundColor: 'skyblue',
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: '600',
    color: '#03396c',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  iconButton: {
    backgroundColor: '#CCCCCC',
    borderRadius: 20,
    padding: 8,
    marginHorizontal: 5,
  },
  icon: {
    fontSize: 20,
  },

  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginBottom: 20,
  },
  chooseImageButton: {
    backgroundColor: '#CCCCCC',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  chooseImageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#051e3e',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  updateButton: {
    backgroundColor: '#f0e4e4',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default QuanLyDanhSachDichVu;
