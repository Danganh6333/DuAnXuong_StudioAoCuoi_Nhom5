import { StyleSheet, Text, View, Image, ScrollView, Pressable,SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Modal } from 'react-native-paper';


const QuanLyNhanVien = () => {
  const [modal, setmodal] = useState(false);
  const openmodal = () => {
    setmodal(true);
  }
  return (
    <View style={{ backgroundColor: 'red', flex: 1 }}>
      {/* box1 */}
      {/* <View style={{ backgroundColor: '#fff555', flex: 0.1, alignItems: 'center', flexDirection: 'row', paddingLeft: '5%' }}>
        <View style={{ backgroundColor: '#fff', width: 40, height: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 25, height: 25 }} source={require('../img/left.png')} />
        </View>
        <Text style={{ marginLeft: 10, color: 'black', fontWeight: 'bold', fontSize: 20 }}> Nhân Viên</Text>
      </View> */}
      {/* box2 */}
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
          </View>
          <Pressable onPress={openmodal}>
            <View style={{ backgroundColor: '#6671D7', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Image style={{ width: 35, height: 35 }} source={require('../img/user.png')} />
              <View>
                <Text style={{ color: 'black' }}>Nhân viên 1</Text>
                <Text style={{ color: 'black' }}>nv1@gmail.com</Text>
              </View>
              <View style={{ flexDirection: 'row', }}>
                <Image style={{ width: 35, height: 35 }} source={require('../img/edit.png')} />
                <Image style={{ width: 35, height: 35 }} source={require('../img/trash.png')} />
              </View>
            </View>
          </Pressable>


          <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
          </View>
          <View style={{ backgroundColor: '#6671D7', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image style={{ width: 35, height: 35 }} source={require('../img/user.png')} />
            <View>
              <Text style={{ color: 'black' }}>Nhân viên 1</Text>
              <Text style={{ color: 'black' }}>nv1@gmail.com</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
              <Image style={{ width: 35, height: 35 }} source={require('../img/edit.png')} />
              <Image style={{ width: 35, height: 35 }} source={require('../img/trash.png')} />
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
          </View>
          <View style={{ backgroundColor: '#6671D7', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image style={{ width: 35, height: 35 }} source={require('../img/user.png')} />
            <View>
              <Text style={{ color: 'black' }}>Nhân viên 1</Text>
              <Text style={{ color: 'black' }}>nv1@gmail.com</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
              <Image style={{ width: 35, height: 35 }} source={require('../img/edit.png')} />
              <Image style={{ width: 35, height: 35 }} source={require('../img/trash.png')} />
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
          </View>
          <View style={{ backgroundColor: '#6671D7', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image style={{ width: 35, height: 35 }} source={require('../img/user.png')} />
            <View>
              <Text style={{ color: 'black' }}>Nhân viên 1</Text>
              <Text style={{ color: 'black' }}>nv1@gmail.com</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
              <Image style={{ width: 35, height: 35 }} source={require('../img/edit.png')} />
              <Image style={{ width: 35, height: 35 }} source={require('../img/trash.png')} />
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
          </View>
          <View style={{ backgroundColor: '#6671D7', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image style={{ width: 35, height: 35 }} source={require('../img/user.png')} />
            <View>
              <Text style={{ color: 'black' }}>Nhân viên 1</Text>
              <Text style={{ color: 'black' }}>nv1@gmail.com</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
              <Image style={{ width: 35, height: 35 }} source={require('../img/edit.png')} />
              <Image style={{ width: 35, height: 35 }} source={require('../img/trash.png')} />
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
          </View>
          <View style={{ backgroundColor: '#6671D7', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image style={{ width: 35, height: 35 }} source={require('../img/user.png')} />
            <View>
              <Text style={{ color: 'black' }}>Nhân viên 1</Text>
              <Text style={{ color: 'black' }}>nv1@gmail.com</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
              <Image style={{ width: 35, height: 35 }} source={require('../img/edit.png')} />
              <Image style={{ width: 35, height: 35 }} source={require('../img/trash.png')} />
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
          </View>
          <View style={{ backgroundColor: '#6671D7', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image style={{ width: 35, height: 35 }} source={require('../img/user.png')} />
            <View>
              <Text style={{ color: 'black' }}>Nhân viên 1</Text>
              <Text style={{ color: 'black' }}>nv1@gmail.com</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
              <Image style={{ width: 35, height: 35 }} source={require('../img/edit.png')} />
              <Image style={{ width: 35, height: 35 }} source={require('../img/trash.png')} />
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
          </View>
          <View style={{ backgroundColor: '#6671D7', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image style={{ width: 35, height: 35 }} source={require('../img/user.png')} />
            <View>
              <Text style={{ color: 'black' }}>Nhân viên 1</Text>
              <Text style={{ color: 'black' }}>nv1@gmail.com</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
              <Image style={{ width: 35, height: 35 }} source={require('../img/edit.png')} />
              <Image style={{ width: 35, height: 35 }} source={require('../img/trash.png')} />
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: '#A1A1A1' }}>
          </View>
          <View style={{ backgroundColor: '#6671D7', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image style={{ width: 35, height: 35 }} source={require('../img/user.png')} />
            <View>
              <Text style={{ color: 'black' }}>Nhân viên 1</Text>
              <Text style={{ color: 'black' }}>nv1@gmail.com</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
              <Image style={{ width: 35, height: 35 }} source={require('../img/edit.png')} />
              <Image style={{ width: 35, height: 35 }} source={require('../img/trash.png')} />
            </View>
          </View>
        </ScrollView>
        {/* box3 */}
        <View style={{
          position: 'absolute',
          bottom: 5,
          right: 5,
        }}>
          <Image style={{
            width: 40,
            height: 40,
          }} source={require('../img/add.png')} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          style={{ flex: 1, backgroundColor: '#E8E8E8' }}>
          
          <ScrollView style={{maxHeight: '87%'}}>
           
              <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Chi tiết nhân viên</Text>

              <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Chi tiết nhân viên</Text>
              <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>Nhân Viên 1</Text>

              <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Tên người dùng :</Text>
              <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>nhanvien01</Text>

              <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Mật khẩu :</Text>
              <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>123456</Text>

              <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Email</Text>
              <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>nv1@gmail.com</Text>

              <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Địa chỉ :</Text>
              <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>Yên lạc - Vĩnh Phúc</Text>

              <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Số điện thoại</Text>
              <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>0386 576 575</Text>

              <Text style={{ marginTop: 15, fontSize: 19, color: 'black', fontWeight: 'bold', paddingLeft: '5%' }}>Ghi chú :</Text>
              <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', paddingLeft: '5%' }}>Trừ lỗi D6,D8, phạt 500.000 rừ lỗi D6,D8, phạt 500.000rừ lỗi D6,D8, phạt 500.000rừ lỗi D6,D8, phạt 500.000rừ lỗi D6,D8, phạt 500.000rừ lỗi D6,D8, phạt 500.000
                6,D8, phạt 500.000 rừ lỗi D6,D8, phạt 500.000rừ lỗi D6,D8, phạt 500.000rừ lỗi D6,D8, phạt 500.000rừ lỗi D6,D8, phạt 500.000rừ lỗi D6,D8, phạt 500.000

              </Text>

           
          </ScrollView>
 
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
            <Pressable style={{ width: 160, height: 50, backgroundColor: '#B0A4A8', justifyContent: 'center', borderRadius: 25, alignItems: 'center' }} onPress={() => setmodal(false)}>

              <Text style={{ color: 'black', textAlign: 'center' }}>Đóng</Text>
            </Pressable>
          </View>


        </Modal>
      </View>

    </View>
  );
};

export default QuanLyNhanVien;

const styles = StyleSheet.create({});
