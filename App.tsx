import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ManHinhChao from './Screens/ManHinhChao';
import DangNhap from './Screens/Access/DangNhap';
import DangKy from './Screens/Access/DangKy';
import ThayDoiMatKhau from './Screens/Access/ThayDoiMatKhau';
import QuanLyCongViec from './Screens/QuanLyCongViec';
import QuanLyDanhSachDichVu from './Screens/QuanLyDanhSachDichVu';
import TrangChu from './Screens/TrangChu';
import QuanLyHoaDon from './Screens/QuanLyHoaDon';
import QuanLyNhanVien from './Screens/QuanLyNhanVien';
import QuanLyThongKe from './Screens/QuanLyThongKe';
import DrawerNavigation from './Components/DrawerNavigation';
import QuanLyKhachHang from './Screens/QuanLyKhachHang';
import CapNhatThongTin from './Screens/Access/CapNhatThongTin';
import {NhanVienIdContext} from './Components/NhanVienIdContext';

const App = () => {
  return (
    <NavigationContainer>
      <NhanVienIdContext>
        <Stack />
      </NhanVienIdContext>
    </NavigationContainer>
  );
};
const Stack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="ManHinhChao" component={DangNhap} />
      <Stack.Screen
        name="DangKy"
        component={DangNhap}
        options={{headerShown: false}}
      />
      <Stack.Screen name="DangNhap" component={DangNhap} />
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigation}
        options={{headerShown: true}

      }
      />
      <Stack.Screen
        name="ThayDoiMatKhau"
        component={ThayDoiMatKhau}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CapNhatThongTin"
        component={CapNhatThongTin}
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
      <Stack.Screen name="QuanLyKhachHang" component={QuanLyKhachHang} />
    </Stack.Navigator>
  );
};
export default App;

const styles = StyleSheet.create({});
