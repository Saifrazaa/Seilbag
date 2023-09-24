import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '@components/layout';
import DirectionHeader from '@components/headers/direction-header';
import {Box} from '@theme/grid';
import {ptp} from '@utils/helper';
import {SCREEN_WIDTH, SPACE_X} from '@utils/variables';
import {Colors} from '@theme/values/colors';
import BluetoothConnectIcon from '@assets/media/bluetooth-connect.svg';
import LeftArrowIcon from '@assets/media/left-arrow.svg';
import LeftArrowYellowIcon from '@assets/media/left-arrow-yellow.svg';
import ChevronLeftIcon from '@assets/media/chevron-left.svg';
import ChevronLeftWhiteIcon from '@assets/media/chevron-left-white.svg';
import TriangleIcon from '@assets/media/triangle.svg';
import TriangleYellowIcon from '@assets/media/triangle-yellow.svg';
import TriangleWhiteIcon from '@assets/media/triangle-white.svg';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withRepeat,
  Easing,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

type ContextType = {
  translateX: number;
  translateY: number;
};

type DirectionType = 'LEFT' | 'RIGHT' | 'EMERGENCY' | null;

const getIndicatorColor = (direction: DirectionType, index: number) => {
  if (index > 3 && index < 8) return Colors.transparent;
  else {
    if (direction === 'EMERGENCY') return Colors.warning;
    if (direction === 'LEFT') {
      if (index < 4) return Colors.warning;
      return Colors.white;
    }
    if (direction === 'RIGHT') {
      if (index > 7) return Colors.warning;
      return Colors.white;
    }
    if (direction === null) {
      if (index < 4 || index > 7) return Colors.white;
    }
  }
};

const getActiveIndicator = (direction: DirectionType, index: number) => {
  if (index > 3 && index < 8) return false;
  else {
    if (direction === 'EMERGENCY') return true;
    if (direction === 'LEFT') {
      if (index < 4) return true;
      return false;
    }
    if (direction === 'RIGHT') {
      if (index > 7) return true;
      return false;
    }
    if (direction === null) {
      if (index < 4 || index > 7) return false;
    }
  }
};

const BOX_SIZE = Math.floor(SCREEN_WIDTH * 0.55);
const Directions = () => {
  const [isBack, setIsBack] = useState<boolean>(false);
  const leftTranslateX = useSharedValue(0);
  const rightTranslateX = useSharedValue(0);
  const upTranslateX = useSharedValue(0);
  const downTranslateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [direction, setDirection] = useState<DirectionType>(null);

  const handleSelectDirection = (direction: DirectionType) => {
    setDirection(direction);
  };

  const leftPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = leftTranslateX.value;
    },
    onActive: (event, context) => {
      if (event.translationX > 0) return;
      leftTranslateX.value = event.translationX + context.translateX;
    },
    onEnd: event => {
      const distance = -30;
      if (event.translationX < distance) {
        runOnJS(handleSelectDirection)('LEFT');
      }
      leftTranslateX.value = withSpring(0);
    },
  });

  const rightPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = rightTranslateX.value;
    },
    onActive: (event, context) => {
      if (event.translationX < 0) return;
      rightTranslateX.value = -(event.translationX + context.translateX);
    },
    onEnd: event => {
      const distance = 30;
      if (event.translationX > distance) {
        runOnJS(handleSelectDirection)('RIGHT');
      }
      rightTranslateX.value = withSpring(0);
    },
  });

  const upPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateY = upTranslateX.value;
    },
    onActive: (event, context) => {
      if (event.translationY > 0) return;
      upTranslateX.value = event.translationY + context.translateY;
    },
    onEnd: event => {
      const distance = -30;
      if (event.translationY < distance) {
        runOnJS(handleSelectDirection)(null);
      }
      upTranslateX.value = withSpring(0);
    },
  });

  const downPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateY = downTranslateX.value;
    },
    onActive: (event, context) => {
      if (event.translationY < 0) return;
      downTranslateX.value = -(event.translationY + context.translateY);
    },
    onEnd: event => {
      const distance = 30;
      if (event.translationY > distance) {
        runOnJS(handleSelectDirection)('EMERGENCY');
      }
      downTranslateX.value = withSpring(0);
    },
  });

  const toggleSwitch = () => {
    setIsBack(!isBack);
  };

  const leftRStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: '-45deg',
        },
        {
          translateX: leftTranslateX.value,
        },
      ],
    };
  });

  const rightRStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: '135deg',
        },
        {
          translateX: rightTranslateX.value,
        },
      ],
    };
  });

  const upRStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: '45deg',
        },
        {
          translateX: upTranslateX.value,
        },
      ],
    };
  });

  const downRStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: '-135deg',
        },
        {
          translateX: downTranslateX.value,
        },
      ],
    };
  });

  const blinkingStyle = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  });

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 400, easing: Easing.ease}),
        withTiming(0, {duration: 400, easing: Easing.ease}),
      ),
      -1,
      true,
    );
  }, [direction]);

  return (
    <Layout>
      <DirectionHeader isEnabled={isBack} toggleSwitch={toggleSwitch} />
      <Box style={styles.displayContainer}>
        <Box container reversed={isBack}>
          <Box row spaced style={{paddingHorizontal: ptp(24)}} container>
            {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], (_, index) => {
              const active = getActiveIndicator(direction, index);
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.indicatorItem,
                    active ? blinkingStyle : null,
                    {
                      backgroundColor: getIndicatorColor(direction, index),
                      borderWidth: index > 3 && index < 8 ? 1 : 0,
                    },
                  ]}
                />
              );
            })}
          </Box>
          <Box style={[styles.innerContainer]} container end={isBack}>
            <BluetoothConnectIcon
              width={ptp(32)}
              height={ptp(32)}
              style={{transform: [{rotate: isBack ? '180deg' : '0deg'}]}}
            />
          </Box>
        </Box>
      </Box>
      <Box container style={{flex: 1}} centered justified>
        <View
          style={{
            width: BOX_SIZE,
            height: BOX_SIZE,
            borderColor: '#3A3A3A',
            transform: [{rotate: '45deg'}],
            borderWidth: 1,
            position: 'relative',
          }}>
          {direction === 'LEFT' && (
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  zIndex: 20,
                  left: ptp(-48),
                  bottom: ptp(-48),
                  transform: [{rotate: '-45deg'}],
                },
                blinkingStyle,
              ]}>
              <LeftArrowYellowIcon
                width={Math.sqrt(BOX_SIZE ** 2 * 2) * 0.9}
                height={Math.sqrt(BOX_SIZE ** 2 * 2) * 0.9}
              />
            </Animated.View>
          )}
          {direction === 'RIGHT' && (
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  zIndex: 20,
                  right: ptp(-48),
                  top: ptp(-48),
                  transform: [{rotate: '135deg'}],
                },
                blinkingStyle,
              ]}>
              <LeftArrowYellowIcon
                width={Math.sqrt(BOX_SIZE ** 2 * 2) * 0.9}
                height={Math.sqrt(BOX_SIZE ** 2 * 2) * 0.9}
              />
            </Animated.View>
          )}
          {direction === 'EMERGENCY' && (
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  zIndex: 20,
                  left: ptp(38),
                  top: ptp(2),
                  transform: [{rotate: '75deg'}, {translateX: 12}],
                },
                blinkingStyle,
              ]}>
              <TriangleYellowIcon
                width={BOX_SIZE * 0.8}
                height={BOX_SIZE * 0.8}
              />
            </Animated.View>
          )}
          <View
            style={[
              {
                position: 'absolute',
                width: Math.floor(Math.sqrt(Math.pow(BOX_SIZE, 2) * 2)) - 1,
                height: 1,
                backgroundColor: '#3A3A3A',
                transform: [
                  {translateX: BOX_SIZE - BOX_SIZE / 2},
                  {translateY: 0 - BOX_SIZE / 2},
                  {rotate: '135deg'},
                  {translateX: -(-((80 * BOX_SIZE) / 198) - BOX_SIZE / 2)},
                  {translateY: -(BOX_SIZE - BOX_SIZE / 2)},
                ],
                right: 0,
              },
            ]}
          />
          <View
            style={[
              {
                position: 'absolute',
                width: Math.floor(Math.sqrt(Math.pow(BOX_SIZE, 2) * 2)) - 1,
                height: 1,
                backgroundColor: '#3A3A3A',
                transform: [
                  {translateX: 0 - BOX_SIZE / 2},
                  {translateY: 0 - BOX_SIZE / 2},
                  {rotate: '45deg'},
                  {translateX: -(-((80 * BOX_SIZE) / 198) - BOX_SIZE / 2)},
                  {translateY: -(0 - BOX_SIZE / 2)},
                ],
                left: 0,
              },
            ]}
          />
          {/* Left Indicator */}
          <PanGestureHandler onGestureEvent={leftPanGestureEvent}>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  left: ptp(-24),
                  bottom: ptp(12),
                  width: BOX_SIZE / 2,
                },
                leftRStyle,
              ]}>
              <Box row centered>
                {direction === 'LEFT' ? (
                  <ChevronLeftWhiteIcon
                    width={ptp(26.92 * 0.4)}
                    height={ptp(45.62 * 0.4)}
                  />
                ) : (
                  <ChevronLeftIcon
                    width={ptp(26.92 * 0.4)}
                    height={ptp(45.62 * 0.4)}
                  />
                )}
                {direction !== 'LEFT' && (
                  <LeftArrowIcon width={ptp(24)} height={ptp(24)} />
                )}
              </Box>
            </Animated.View>
          </PanGestureHandler>
          {/* Right Indicator */}
          <PanGestureHandler onGestureEvent={rightPanGestureEvent}>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  right: ptp(-24),
                  top: ptp(12),
                  width: BOX_SIZE / 2,
                },
                rightRStyle,
              ]}>
              <Box row centered>
                {direction === 'RIGHT' ? (
                  <ChevronLeftWhiteIcon
                    width={ptp(26.92 * 0.4)}
                    height={ptp(45.62 * 0.4)}
                  />
                ) : (
                  <ChevronLeftIcon
                    width={ptp(26.92 * 0.4)}
                    height={ptp(45.62 * 0.4)}
                  />
                )}
                {direction !== 'RIGHT' && (
                  <LeftArrowIcon width={ptp(24)} height={ptp(24)} />
                )}
              </Box>
            </Animated.View>
          </PanGestureHandler>
          {/* Upward Indicator */}
          <PanGestureHandler onGestureEvent={upPanGestureEvent}>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  left: ptp(-32),
                  top: ptp(-16),
                },
                upRStyle,
              ]}>
              <Box row centered>
                <ChevronLeftIcon
                  width={ptp(26.92 * 0.4)}
                  height={ptp(45.62 * 0.4)}
                />
                <ChevronLeftIcon
                  width={ptp(26.92 * 0.4)}
                  height={ptp(45.62 * 0.4)}
                />
                <ChevronLeftIcon
                  width={ptp(26.92 * 0.4)}
                  height={ptp(45.62 * 0.4)}
                />
                <LeftArrowIcon
                  width={ptp(24)}
                  height={ptp(24)}
                  style={{opacity: 0}}
                />
              </Box>
            </Animated.View>
          </PanGestureHandler>
          {/* Downward Indicator */}
          <PanGestureHandler onGestureEvent={downPanGestureEvent}>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  right: ptp(-14),
                  bottom: ptp(-10),
                },
                downRStyle,
              ]}>
              <Box row centered>
                {direction === 'EMERGENCY' ? (
                  <ChevronLeftWhiteIcon
                    width={ptp(26.92 * 0.4)}
                    height={ptp(45.62 * 0.4)}
                  />
                ) : (
                  <ChevronLeftIcon
                    width={ptp(26.92 * 0.4)}
                    height={ptp(45.62 * 0.4)}
                  />
                )}
                <LeftArrowIcon
                  width={ptp(24)}
                  height={ptp(24)}
                  style={{opacity: 0}}
                />
              </Box>
            </Animated.View>
          </PanGestureHandler>
        </View>
        {direction === 'EMERGENCY' ? (
          <TriangleWhiteIcon
            width={ptp(32)}
            height={ptp(32)}
            style={{marginTop: ptp(64)}}
          />
        ) : (
          <TriangleIcon
            width={ptp(32)}
            height={ptp(32)}
            style={{marginTop: ptp(64)}}
          />
        )}
      </Box>
    </Layout>
  );
};

export default Directions;

const styles = StyleSheet.create({
  displayContainer: {
    paddingTop: ptp(12),
    paddingBottom: ptp(32),
    paddingHorizontal: ptp(SPACE_X),
    borderColor: Colors.fade,
    borderBottomWidth: 1,
  },
  innerContainer: {
    paddingHorizontal: ptp(8),
    paddingVertical: ptp(2),
    backgroundColor: '#1A1B28',
    borderRadius: 6,
  },
  indicatorItem: {
    width: ptp(9),
    height: ptp(3),
    borderColor: '#272834',
  },
});
