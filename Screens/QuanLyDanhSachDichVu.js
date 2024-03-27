import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import COMMON from '../COMMON';
import {AnimatedFAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Item = ({item}) => (
  <TouchableOpacity style={styles.itemContainer}>
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{item.tenDichVu}</Text>
      <Text style={styles.itemPrice}>{item.giaTien.toLocaleString()} VNĐ</Text>
    </View>
    <View style={{display: 'flex', justifyContent: 'space-between'}}>
      <Text style={styles.itemDescription}>{item.moTa}</Text>
      <View>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/cross.png')}
            style={{backgroundColor: '#0f1525', padding: 22}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/pen-nib.png')}
            style={{backgroundColor: '#0f1525'}}
          />
        </TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

const QuanLyDanhSachDichVu = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acesnding, setacesnding] = useState('');
  const [isExtended, setIsExtended] = React.useState(true);

  const getDanhSachDichVu = async () => {
    try {
      const response = await fetch(
        `http://${COMMON.ipv4}:3000/dichvus/getDichVu`,
      );
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDanhSachDichVu();
  }, []);

  const onScroll = ({nativeEvent}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = {right: 16, bottom: 16};
  return (
    <View style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
      <View>
        <Text>Danh sách dịch vụ</Text>
      </View>
      {loading ? (
        <ActivityIndicator animating={true} color="#2aa198" />
      ) : (
        <FlatList
          data={data}
          onScroll={onScroll}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.flatListContent}
        />
      )}
      <AnimatedFAB
        icon="plus"
        label="Thêm mới"
        extended={isExtended}
        onPress={() => console.log('Pressed')}
        visible={true}
        animateFrom="right"
        iconMode="dynamic"
        style={[styles.fabStyle, fabStyle]}
        labelStyle={styles.fabLabel}
        contentStyle={styles.fabContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flatListContent: {
    paddingBottom: 80,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 15,
    borderRadius: 13,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#0f1525',
    color: '#FFFFFF',
  },
  itemDescription: {
    fontSize: 14,
  },
  fabStyle: {
    position: 'absolute',
  },
  fabLabel: {
    fontSize: 16,
  },
  fabContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default QuanLyDanhSachDichVu;
