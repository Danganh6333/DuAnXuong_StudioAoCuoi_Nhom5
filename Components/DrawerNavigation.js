import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import QuanLyCongViec from '../Screens/QuanLyCongViec';
import QuanLyDanhSachDichVu from '../Screens/QuanLyDanhSachDichVu';
import QuanLyHoaDon from '../Screens/QuanLyHoaDon';
import QuanLyNhanVien from '../Screens/QuanLyNhanVien';
import QuanLyThongKe from '../Screens/QuanLyThongKe';
import CustomDrawer from './CustomDrawer';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import QuanLyKhachHang from '../Screens/QuanLyKhachHang';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUserId } from './NhanVienIdContext';

const DrawerNavigation = props => {
  const route = useRoute();
  const userData = route.params.userData;
  const [vaiTro, setVaiTro] = useState(userData.user.vaitro)
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation()
  const handleFocus = (focused, route) => {
    if (focused) {
      switch (route.name) {
        case 'Quản Lý Công Việc':
          return 'business';
        case 'Quản Lý Danh Sách Dịch Vụ':
          return 'list';
        case 'Quản Lý Hóa Đơn':
          return 'receipt';
        case 'Quản Lý Nhân Viên':
          return 'people';
        case 'Quản Lý Thống Kê':
          return 'analytics';
        case 'Quản Lý Khách Hàng':
          return 'walk';
        default:
          return 'home';
      }
    } else {
      switch (route.name) {
        case 'Quản Lý Công Việc':
          return 'business-outline';
        case 'Quản Lý Danh Sách Dịch Vụ':
          return 'list-outline';
        case 'Quản Lý Hóa Đơn':
          return 'receipt-outline';
        case 'Quản Lý Nhân Viên':
          return 'people-outline';
        case 'Quản Lý Thống Kê':
          return 'analytics-outline';
          case 'Quản Lý Khách Hàng':
            return 'walk-outline';
        default:
          return 'home-outline';
      }
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        drawerActiveBackgroundColor: '#5F9EA0',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontFamily: 'Urbanist-VariableFont_wght',
          fontSize: 15,
        },
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight:10 }}
            onPress={() => navigation.navigate('CapNhatThongTin')}
          >
            <Icon name="person-outline" size={25} color="black" />
          </TouchableOpacity>
        ),
      }}
      
      drawerContent={props => <CustomDrawer {...props} userData={userData} />}>
      {/* <Drawer.Screen
        name="Trang Chủ"
        component={TrangChu}
        options={({focused}) => ({
          drawerIcon: ({color, size}) => (
            <Icon
              name={handleFocus(focused, {name: 'Trang Chủ'})}
              size={size}
              color={color}
            />
          ),
         
        })}
      /> */}
      <Drawer.Screen
        name="Quản Lý Công Việc"
        component={QuanLyCongViec}
        options={({focused}) => ({
          drawerIcon: ({color, size}) => (
            <Icon
              name={handleFocus(focused, {name: 'Quản Lý Công Việc'})}
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Quản Lý Danh Sách Dịch Vụ"
        component={QuanLyDanhSachDichVu}
        options={({focused}) => ({
          drawerIcon: ({color, size}) => (
            <Icon
              name={handleFocus(focused, {name: 'Quản Lý Danh Sách Dịch Vụ'})}
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Quản Lý Hóa Đơn"
        component={QuanLyHoaDon}
        options={({focused}) => ({
          drawerIcon: ({color, size}) => (
            <Icon
              name={handleFocus(focused, {name: 'Quản Lý Hóa Đơn'})}
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Quản Lý Khách Hàng"
        component={QuanLyKhachHang}
        options={({focused}) => ({
          drawerIcon: ({color, size}) => (
            <Icon
              name={handleFocus(focused, {name: 'Quản Lý Khách Hàng'})}
              size={size}
              color={color}
            />
          ),
        })}
      />
     {vaiTro === 1 && (
        <Drawer.Screen
          name="Quản Lý Nhân Viên"
          component={QuanLyNhanVien}
          options={({ focused }) => ({
            drawerIcon: ({ color, size }) => (
              <Icon
                name={handleFocus(focused, { name: 'Quản Lý Nhân Viên' })}
                size={size}
                color={color}
              />
            ),
          })}
        />
      )}
      <Drawer.Screen
        name="Quản Lý Thống Kê"
        component={QuanLyThongKe}
        options={({focused}) => ({
          drawerIcon: ({color, size}) => (
            <Icon
              name={handleFocus(focused, {name: 'Quản Lý Thống Kê'})}
              size={size}
              color={color}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
