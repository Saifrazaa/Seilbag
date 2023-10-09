import {StyleSheet, View, Switch} from 'react-native';
import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {ptp} from '@utils/helper';
import {SPACE_X} from '@utils/variables';
import {Box} from '@theme/grid';
import IconButton from '../buttons/icon-button';
import LockCircleWhiteIcon from '@assets/media/lock-circle-white.svg';
import Container from '../container';
import {RegularText} from '@theme/typography';
import {Colors} from '@theme/values/colors';
import UndoIcon from '@assets/media/undo.svg';
import {useTranslation} from 'react-i18next';

interface DirectionHeaderProps {
  isEnabled: boolean;
  toggleSwitch: Dispatch<SetStateAction<boolean>>;
}

const DirectionHeader: FC<DirectionHeaderProps> = ({
  isEnabled,
  toggleSwitch,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.header}>
      <Box row centered>
        <IconButton>
          <UndoIcon width={ptp(24)} height={ptp(24)} />
        </IconButton>
        <Container>
          <Box centered>
            <Box row centered>
              <RegularText>{t('Front')}</RegularText>
              <Switch
                trackColor={{false: '#5D637F', true: '#5D637F'}}
                thumbColor={isEnabled ? Colors.white : Colors.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{marginHorizontal: ptp(8)}}
              />
              <RegularText>{t('Back')}</RegularText>
            </Box>
          </Box>
        </Container>
        <IconButton>
          <LockCircleWhiteIcon width={ptp(28)} height={ptp(28)} />
        </IconButton>
      </Box>
    </View>
  );
};

export default DirectionHeader;

const styles = StyleSheet.create({
  header: {
    paddingVertical: ptp(24),
    paddingHorizontal: ptp(SPACE_X),
    borderColor: Colors.fade,
    borderBottomWidth: 1,
    marginBottom: ptp(24),
  },
});
