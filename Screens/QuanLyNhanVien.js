import { StyleSheet, Text, View, Image, ScrollView, Pressable,SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Modal } from 'react-native-paper';


const QuanLyNhanVien = () => {
  const [modal, setmodal] = useState(false);
  const openmodal = () => {
    setmodal(true);
  }
  return (
    <View>
      <Text>QuanLyNhanVien</Text>
    </View>
  );
};

export default QuanLyNhanVien;

const styles = StyleSheet.create({});
