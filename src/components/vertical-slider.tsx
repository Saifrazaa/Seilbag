import {
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {RegularText} from '@theme/typography';
import {Colors} from '@theme/values/colors';

const initialValue = 20;
const min = 0;
const max = 100;
const CIRCLE_DIAMETER = 32;

const getBottomOffsetFromValue = (
  value: number,
  rangeMin: number,
  rangeMax: number,
  barHeight: number | null,
) => {
  if (barHeight === null) return 0;
  const valueOffset = value - rangeMin;
  const totalRange = rangeMax - rangeMin;
  const percentage = valueOffset / totalRange;
  return barHeight * percentage;
};

const getValueFromBottomOffset = (
  offset: number,
  barHeight: number | null,
  rangeMin: number,
  rangeMax: number,
) => {
  if (barHeight === null) return 0;
  return ((rangeMax - rangeMin) * offset) / barHeight;
};

const VerticalSlider = () => {
  const [barHeight, setBarHeight] = useState<number | null>(null);
  const [value, setValue] = useState<number>(initialValue);
  const [deltaValue, setDeltaValue] = useState<number>(0);

  const onBarLayout = (event: LayoutChangeEvent) => {
    const {height: barHeight} = event.nativeEvent.layout;
    setBarHeight(barHeight);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_, gestureState) => onMove(gestureState),
    onPanResponderRelease: () => onEndMove(),
    onPanResponderEnd: () => true,
  });

  const onMove = (gestureState: PanResponderGestureState) => {
    const newDeltaValue = getValueFromBottomOffset(
      -gestureState.dy,
      barHeight,
      min,
      max,
    );
    setDeltaValue(newDeltaValue);
  };

  const onEndMove = () => {
    setValue(value + deltaValue);
    setDeltaValue(0);
  };

  const capValueWithinRange = (value: number, range: number[]) => {
    if (value < range[0]) return range[0];
    if (value > range[1]) return range[1];
    return value;
  };

  const cappedValue = capValueWithinRange(value + deltaValue, [min, max]);
  const bottomOffset = getBottomOffsetFromValue(
    cappedValue,
    min,
    max,
    barHeight,
  );
  return (
    <>
      <RegularText>{Math.floor(cappedValue)}</RegularText>
      <View style={styles.barContainer}>
        <View style={styles.bar} onLayout={onBarLayout}></View>
        <View
          style={[styles.circle, {bottom: bottomOffset}]}
          {...panResponder.panHandlers}></View>
      </View>
    </>
  );
};

export default VerticalSlider;

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
