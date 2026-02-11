import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import CarLight from './CarLight';

export default function FlipCard({item}) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    Animated.spring(animatedValue, {
      toValue: flipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    setFlipped(!flipped);
  };

  return (
      <TouchableWithoutFeedback onPress={flipCard}>
        <View style={styles.container}>
          {/* FRONT */}
          <Animated.View
              style={[
                styles.card,
                {transform: [{rotateY: frontInterpolate}]},
              ]}
          >
            <CarLight carLight={item}/>
          </Animated.View>

          {/* BACK */}
          <Animated.View
              style={[
                styles.card,
                {
                  transform: [{rotateY: backInterpolate}],
                },
              ]}
          >
            <CarLight carLight={item} showSolution={true}/>

          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: '100%',
  },
  card: {
    position: 'absolute',
    padding: 15,
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 5,
    borderRadius: 13,
    marginHorizontal: 10,
  },
  cardBack: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
  },
});

