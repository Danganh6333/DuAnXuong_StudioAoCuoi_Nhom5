import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import COMMON from '../COMMON';
import { Picker } from '@react-native-picker/picker';

const QuanLyThongKe = () => {
  const [revenueByTime, setRevenueByTime] = useState(0);
  const [revenueByService, setRevenueByService] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [dichVuData, setDichVuData] = useState([]);
  const [selectedServiceData, setSelectedServiceData] = useState(null);

  useEffect(() => {
    // Function to fetch revenue by time
    const fetchRevenueByTime = async () => {
      try {
        const response = await axios.get(`http://${COMMON.ipv4}:3000/hoadons/getTotalRevenue`);
        const totalRevenue = response.data.data[0].total; // Access the first element of the array and get the 'total' field
        setRevenueByTime(totalRevenue);
        console.log(totalRevenue);
      } catch (error) {
        console.error(error);
      }
    };

    // Function to fetch revenue by service
    const fetchRevenueByService = async () => {
      try {
        const response = await axios.get(`http://${COMMON.ipv4}:3000/hoadons/getRevenueByService`);
        setRevenueByService(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getSpinnerDichVu = async () => {
      try {
        const response = await fetch(`http://${COMMON.ipv4}:3000/dichvus/getDichVu`);
        const json = await response.json();
        setDichVuData(json);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the functions to fetch data
    fetchRevenueByTime();
    fetchRevenueByService();
    getSpinnerDichVu();
  }, []);

  const handleServiceChange = (itemValue) => {
    setSelectedService(itemValue);
    const selectedService = revenueByService.find((item) => item._id === itemValue);
    setSelectedServiceData(selectedService);
  };

  return (
    <View>
      <Text>Quản Lý Thống Kê</Text>
      <Text>
        Doanh thu:{' '}
        {revenueByTime.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })}
      </Text>
      <Text>Doanh thu theo dịch vụ:</Text>

      <Text>Mời bạn chọn dịch vụ:</Text>
      <Picker selectedValue={selectedService} onValueChange={handleServiceChange}>
        <Picker.Item label="Chọn dịch vụ" value="" />
        {dichVuData.map((dichVu, index) => (
          <Picker.Item key={index} label={dichVu.tenDichVu} value={dichVu._id} />
        ))}
      </Picker>

      {selectedServiceData ? (
        <View>
          <Text>Dịch vụ: {selectedServiceData.tenDichVu}</Text>
          <Text>
            Doanh thu:{' '}
            {selectedServiceData.totalRevenue.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default QuanLyThongKe;

const styles = StyleSheet.create({});