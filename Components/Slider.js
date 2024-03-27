import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Carousel from 'pinar';
import SliderImage from './SliderImage'; // Assuming this contains your image data

const Slider = () => {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        autoplay
        style={styles.carousel}
        showsControls={false}
        dotStyle={styles.dotStyle}
        dotActiveStyle={styles.dotActiveStyle}>
        {SliderImage.map((img, index) => (
          <Image source={img.image} style={styles.image} key={index} />
        ))}
      </Carousel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200, // Adjust height as needed
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden', // Clip content that overflows the border radius
  },
  dotStyle: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginHorizontal: 5,
    borderRadius: 4,
  },
  dotActiveStyle: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover', // Use cover to fill the image container without stretching
  },
  carousel: {
    flex: 1,
  },
});

export default Slider;
