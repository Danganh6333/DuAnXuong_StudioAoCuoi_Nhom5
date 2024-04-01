import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';

const ManHinhChao = () => {
  const navigation = useNavigation(); // Hook từ react-navigation

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('DangNhap'); // Thay 'Login' bằng tên màn hình đăng nhập của bạn
    }, 2800); // Chờ 3 giây trước khi chuyển

    return () => clearTimeout(timer); // Dọn dẹp khi component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../img/welcome.json")}
        style={styles.animation}
        autoPlay
        loop
      />
      <Text style={styles.welcomeText}>Welcome to...</Text>
    </View>
  );
};

export default ManHinhChao;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  animation: {
    width: "60%", 
    height: "40%"
  },
  welcomeText: {
    marginTop: 20, 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333',
    fontFamily: 'Rubik-Italic-VariableFont_wght'
  },
});