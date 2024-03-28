import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ManHinhChao from './Screens/ManHinhChao';
import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';
import DangNhap from './Screens/Access/DangNhap';
import DangKy from './Screens/Access/DangKy';
import ThayDoiMatKhau from './Screens/Access/ThayDoiMatKhau';
import QuanLyCongViec from './Screens/QuanLyCongViec';
import QuanLyDanhSachDichVu from './Screens/QuanLyDanhSachDichVu';
import TrangChu from './Screens/TrangChu';
import QuanLyHoaDon from './Screens/QuanLyHoaDon';
import QuanLyNhanVien from './Screens/QuanLyNhanVien';
import QuanLyThongKe from './Screens/QuanLyThongKe';
import QuanLyKhachHang from './Screens/QuanLyKhachHang';
import  Icon  from 'react-native-vector-icons/AntDesign';

const App = () => {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
};

const Drawer = () => {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Drawer.Screen
        name="Trang Chủ"
        component={TrangChu}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen name="Quản Lý Công Việc" component={QuanLyCongViec}
       />
      <Drawer.Screen
        name="Quản Lý Danh Sách Dịch Vụ"
        component={QuanLyDanhSachDichVu}
      />
      <Drawer.Screen name="Quản Lý Hóa Đơn" component={QuanLyHoaDon} />
      <Drawer.Screen name="Quản Lý Nhân Viên" component={QuanLyNhanVien} />
      <Drawer.Screen name="Quản Lý Khách Hàng" component={QuanLyKhachHang} />
      <Drawer.Screen name="Quản Lý Thống Kê" component={QuanLyThongKe} />
      {/* <DrawerItem
        label="Đăng Xuất"
        icon={({color, size}) => (
          <Icon name="log-out" size={size} color={color} />
        )}
        onPress={() => {
          
        }}
      /> */}
    </Drawer.Navigator>
  );
};

const Stack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DangKy"
        component={DangKy}
        options={{headerShown: false}}
      />
      <Stack.Screen name="DangNhap" component={DangNhap} />
      <Stack.Screen
        name="Drawer"
        component={Drawer}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ThayDoiMatKhau"
        component={ThayDoiMatKhau}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ManHinhChao"
        component={ManHinhChao}
        options={{headerShown: false}}
      />

      <Stack.Screen name="TrangChu" component={TrangChu} />
      <Stack.Screen name="QuanLyCongViec" component={QuanLyCongViec} />
      <Stack.Screen
        name="QuanLyDanhSachDichVu"
        component={QuanLyDanhSachDichVu}
      />
      <Stack.Screen name="QuanLyHoaDon" component={QuanLyHoaDon} />
      <Stack.Screen name="QuanLyNhanVien" component={QuanLyNhanVien} />
      <Stack.Screen name="QuanLyThongKe" component={QuanLyThongKe} />
    </Stack.Navigator>
  );
};
export default App;

const styles = StyleSheet.create({});
