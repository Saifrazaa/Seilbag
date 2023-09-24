import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Slider} from '@sharcoux/slider';
import {ptp} from '@utils/helper';
import {RegularText} from '@theme/typography';
import Container from './container';
import SunIcon from '@assets/media/sun.svg';
const VerticalSlider3 = () => {
  const [value, setValue] = useState<number>(100);
  return (
    <>
      <RegularText>{value}</RegularText>
      <Container>
        <Slider
          value={value}
          maximumValue={100}
          minimumValue={20}
          step={5}
          vertical={true}
          minimumTrackTintColor="#4582BC"
          maximumTrackTintColor="#BBBBBB"
          thumbSize={ptp(22)}
          style={{paddingTop: ptp(8), paddingBottom: ptp(16)}}
          onValueChange={value => setValue(value)}
          CustomThumb={() => (
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#4582BC',
              }}>
              <View style={{position: 'absolute', right: -24, top: 2}}>
                <RegularText size={12}>{value}</RegularText>
              </View>
            </View>
          )}
        />
      </Container>
      <SunIcon width={ptp(18)} height={ptp(18)} />
    </>
  );
};

export default VerticalSlider3;

const styles = StyleSheet.create({});
