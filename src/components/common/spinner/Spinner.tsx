import React, { memo } from 'react';
import { styles } from './styles';
import { scale } from '../../../constants/Layout';
import { SpinnerProps } from './interfaces';
import { ActivityIndicator, View } from 'react-native';
import Colors from '../../../constants/Colors';

const Spinner = ( { size = 32, withContainer = true, color = Colors.accent.dark }: SpinnerProps ) => {
  return (
    <View style={ styles.loadingContainer }>
      <ActivityIndicator style={ withContainer && styles.spinnerContainer } color={ color } size={ scale( size ) } />
    </View>
  );
};

export default memo( Spinner );