import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '@components/layout';
import {Box} from '@theme/grid';
import {RegularText} from '@theme/typography';
import Header from '@components/headers/header';
import {useTranslation} from 'react-i18next';

const Email = () => {
  const {t} = useTranslation();

  return (
    <Layout>
      <Header />
      <Box centered justified container style={{flex: 1}}>
        <RegularText size={32}>{t('Coming Soon')}...</RegularText>
      </Box>
    </Layout>
  );
};

export default Email;

const styles = StyleSheet.create({});
