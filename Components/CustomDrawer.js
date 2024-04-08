import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerProgress,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


const CustomDrawer = ({ userData, ...props }) => {
  
  const navigate = useNavigation();
  
  return (
      <View style={styles.container}>
        <DrawerContentScrollView {...props}>
          <View style={styles.header}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.headerText}>Xin chào,{userData.user.tenNguoiDung}</Text>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>

        <TouchableOpacity
          onPress={() => {
            navigate.navigate('ManHinhChao');
          }}
          style={styles.logoutButton}>
          <View style={styles.logoutButtonContainer}>
            <Icon name="log-out-outline" size={22} color="#333" />
            <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Urbanist-VariableFont_wght',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
  },
  logoutButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  logoutButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: 'Urbanist-VariableFont_wght',
    marginLeft: 10,
  },
});

export default CustomDrawer;
