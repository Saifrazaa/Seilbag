import {StyleSheet, View} from 'react-native';
import React from 'react';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Colors} from '@theme/values/colors';

const CIRCLE_DIAMETER = 32;
const min = 0;
const max = 100;

const VerticalSlider2 = () => {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue(0);
  const start = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate(e => {
      offset.value = -e.translationY + start.value;
    })
    .onEnd(() => {
      start.value = offset.value;
    })
    .onFinalize(() => {
      isPressed.value = false;
    });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: offset.value,
      backgroundColor: isPressed ? Colors.dim : Colors.darktext,
    };
  });

  const onGestureEvent = Animated;
  return (
    <View style={styles.barContainer}>
      <View style={styles.bar} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.circle, animatedStyle]} />
      </GestureDetector>
    </View>
  );
};

export default VerticalSlider2;

const styles = StyleSheet.create({
  barContainer: {
    width: CIRCLE_DIAMETER,
    alignItems: 'center',
    paddingVertical: CIRCLE_DIAMETER / 2,
    flex: 1,
  },
  bar: {
    width: 2,
    backgroundColor: Colors.darktext,
    flex: 1,
  },
  circle: {
    borderRadius: CIRCLE_DIAMETER / 2,
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    backgroundColor: Colors.darktext,
    position: 'absolute',
  },
});
