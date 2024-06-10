import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList,Pressable,Platform } from 'react-native';
import COMMON from '../COMMON';
import 'moment/locale/vi'; // Import locale for Vietnamese
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const ThongKeTheoThoiGian = () => {

    const [dateNBD, setdateNBD] = useState(new Date());
  const [dateNKT, setDateNKT] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [ngayKetThuc, setNgayKetThuc] = useState('');
  const [ngayBatDau, setNgayBatDau] = useState('');
  const [data, setData] = useState([]);
   const [show, setShow] = useState(false);
  const [tongTien, setTongTien] = useState("");
  const onChangeNgayBatDau = (event, selectedDateNDB) => {
    setShow(Platform.OS === 'ios');
    if (selectedDateNDB ) {
      setdateNBD(selectedDateNDB);
      setNgayBatDau(getFormattedDate(selectedDateNDB));
    }
  };

  const onChangeNgayKetThuc = (event, selectedDateNKT) => {
    setShow(Platform.OS === 'ios');
    if (selectedDateNKT) {
      setDateNKT(selectedDateNKT);
      setNgayKetThuc(getFormattedDate(selectedDateNKT));
      fetchData();
    }
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  //format date
  const getFormattedDate = (date) => moment(date).format('YYYY-MM-DD');
  console.log(tongTien
  )


  useEffect(() => {
   const fetchData = async () => {
    const response = await fetch(`http://${COMMON.ipv4}:3000/hoadons/thongke?dateNBD=${ngayBatDau}&dateNKT=${ngayKetThuc}`);
    const jsonData = await response.json();

    setData(jsonData.hoaDons);
    setTongTien(jsonData.tongTien);
    console.log(""+tongTien);
  };

  }, []);


  return (
    <View style={st.container}>
       <View style={st.Modal_them_View1 }>
              <Pressable onPress={() => showMode('dateNBD')}>
                <View
                  style={ st.Modal_them_View2    }>
                  <Text  style={st.Modal_them_Text2  }>Từ Ngày</Text>
                </View>
              </Pressable>
              <Text style={{ width: 72 }}>{ngayBatDau}</Text>
              {show && mode === 'dateNBD' && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateNBD}
                  mode={mode}
                  display="default"
                  onChange={onChangeNgayBatDau}
                />
              )}
            </View>
            <View   style={st.Modal_them_View1 }>
              <Text style={{ width: 72 }}>{ngayKetThuc}</Text>
              <Pressable onPress={() => showMode('dateNKT')}>
                <View style={  st.Modal_them_View3 }>
                  <Text style={ st.Modal_them_Text2 }> Đến Ngày  </Text>
                </View>
              </Pressable>
              {show && mode === 'dateNKT' && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateNKT}
                  mode={mode}
                  display="default"
                  onChange={onChangeNgayKetThuc}
                />
              )}
           
      {/* <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.idNhanVien.ten}</Text>
            <Text>{item.idKhachHang.ten}</Text>
            <Text>{tongTien}</Text>
          </View>
        )}
      /> */}
      
            </View>
            <Text style={{textAlign:'center'}}>Tổng tiền: {tongTien}</Text>
    </View>
  );
};

const st = StyleSheet.create({
  container: {
    flex: 1,
    
    marginTop:'40%'
    
  },
  Modal_them_View1:{
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Modal_them_View2:{
    width: 90,
    borderRadius: 20,
    height: 40,
    padding: '5%',
    justifyContent: 'center',
    backgroundColor: '#BF9191',
    
  },
  Modal_them_Text2:{
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  Modal_them_View3:{
    width: 90,
    borderRadius: 20,
    height: 40,
    padding: '5%',
    justifyContent: 'center',
    backgroundColor: '#DAAE7B',
  },
});

export default ThongKeTheoThoiGian;
