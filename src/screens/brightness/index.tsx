import {StyleSheet, View} from 'react-native';
import React, {type FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '@theme/values/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utils/variables';
import {Box} from '@theme/grid';
import {ptp} from '@utils/helper';
import {RegularText} from '@theme/typography';
import PrimaryButton from '@components/buttons/primary-button';
import {HomeScreenProps} from '@utils/@types';
import VerticalSlider3 from '@components/vertical-slider-3.0';
import {useTranslation} from 'react-i18next';

type BrightnessProps = HomeScreenProps<'brightness'>;

const Brightness: FC<BrightnessProps> = ({navigation}) => {
  const {t} = useTranslation();

  const insets = useSafeAreaInsets();

  return (
    <Box
      style={[
        styles.root,
        {
          marginTop: insets.top,
        },
      ]}
      centered
      justifiedEnd>
      <View style={styles.contentContainer}>
        <Box style={styles.titleContainer}>
          <RegularText size={16}>{t('Brightness')}</RegularText>
        </Box>
        <Box centered style={styles.sliderContainer}>
          <VerticalSlider3 />
        </Box>
        <Box style={styles.footer} centered>
          <View style={{width: '60%'}}>
            <PrimaryButton onPress={() => navigation.goBack()}>
              {t('OK')}
            </PrimaryButton>
          </View>
        </Box>
      </View>
    </Box>
  );
};

export default Brightness;

const styles = StyleSheet.create({
  root: {
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingBottom: ptp(16),
  },
  contentContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    width: SCREEN_WIDTH * 0.9,
    maxHeight: SCREEN_HEIGHT * 0.7,
    paddingVertical: ptp(12),
  },
  sliderContainer: {
    height: ptp(240),
  },
  titleContainer: {
    paddingBottom: ptp(12),
    paddingHorizontal: ptp(16),
  },
  footer: {
    paddingTop: ptp(16),
    paddingBottom: ptp(8),
  },
});
