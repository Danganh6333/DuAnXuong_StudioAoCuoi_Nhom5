import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ManHinhChao from './Screens/ManHinhChao';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DangNhap from './Screens/Access/DangNhap';
import DangKy from './Screens/Access/DangKy';
import ThayDoiMatKhau from './Screens/Access/ThayDoiMatKhau';
import QuanLyCongViec from './Screens/QuanLyCongViec';
import QuanLyDanhSachDichVu from './Screens/QuanLyDanhSachDichVu';
import TrangChu from './Screens/TrangChu';
import QuanLyHoaDon from './Screens/QuanLyHoaDon';
import QuanLyNhanVien from './Screens/QuanLyNhanVien';
import QuanLyThongKe from './Screens/QuanLyThongKe';

const App = () => {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
};

const Drawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TrangChu" component={TrangChu} />
      <Drawer.Screen name="QuanLyCongViec" component={QuanLyCongViec} />
      <Drawer.Screen
        name="QuanLyDanhSachDichVu"
        component={QuanLyDanhSachDichVu}
      />
      <Drawer.Screen name="QuanLyHoaDon" component={QuanLyHoaDon} />
      <Drawer.Screen name="QuanLyNhanVien" component={QuanLyNhanVien} />
      <Drawer.Screen name="QuanLyThongKe" component={QuanLyThongKe} />
    </Drawer.Navigator>
  );
};

const Stack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="DangKy" component={DangKy} options={{headerShown:false}} />
      <Stack.Screen
        name="ManHinhChao"
        component={ManHinhChao}
        options={{headerShown: false}}
      />
      <Stack.Screen name="DangNhap" component={DangNhap} />
      <Stack.Screen
        name="Drawer"
        component={Drawer}
        options={{headerShown: false}}
      />

      <Stack.Screen name="ThayDoiMatKhau" component={ThayDoiMatKhau} />
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
