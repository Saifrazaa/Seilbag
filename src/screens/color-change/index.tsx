import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {type FC, useState} from 'react';
import {Colors} from '@theme/values/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utils/variables';
import {Box} from '@theme/grid';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ptp} from '@utils/helper';
import {RegularText} from '@theme/typography';
import PrimaryButton from '@components/buttons/primary-button';
import {HomeScreenProps} from '@utils/@types';
import {COLOR_ITEMS} from '@data/color-item';
import {useTranslation} from 'react-i18next';

type ColorChangeProps = HomeScreenProps<'color-change'>;

const ColorChange: FC<ColorChangeProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const {t} = useTranslation();

  const handleSelectColor = (id: number) => () => {
    setSelectedColor(id);
  };

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
          <RegularText size={16}>{t('Color Change')}</RegularText>
        </Box>
        <Box row style={{flexWrap: 'wrap'}}>
          {COLOR_ITEMS.map((color, index) => {
            const selected = index === selectedColor;
            return (
              <Box
                style={[
                  styles.colorItem,
                  {
                    borderBottomWidth: index > 3 ? 1 : 0,
                    backgroundColor: selected ? Colors.white : '#F3F3F4',
                  },
                ]}
                key={index}>
                <TouchableOpacity
                  style={styles.colorBtnContent}
                  onPress={handleSelectColor(index)}>
                  <Box centered style={{width: '100%'}}>
                    <View
                      style={[styles.colorBox, {backgroundColor: color.color}]}
                    />
                    <RegularText
                      style={{textTransform: 'uppercase', marginTop: ptp(12)}}>
                      {t(color.name.toUpperCase())}
                    </RegularText>
                  </Box>
                </TouchableOpacity>
              </Box>
            );
          })}
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

export default ColorChange;

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
  titleContainer: {
    paddingBottom: ptp(12),
    paddingHorizontal: ptp(16),
  },
  colorItem: {
    width: '25%',
    height: ptp(124),
    backgroundColor: '#F3F3F4',
    borderColor: '#676868',
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  colorBtnContent: {
    paddingTop: ptp(12),
    width: '100%',
    height: '100%',
  },
  colorBox: {
    width: ptp(64),
    height: ptp(64),
    borderColor: Colors.black,
    borderWidth: 1,
  },
  footer: {
    paddingTop: ptp(16),
    paddingBottom: ptp(8),
  },
});
