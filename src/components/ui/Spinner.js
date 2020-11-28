import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Spinner = (props) => {
  const {colors, spec} = useTheme();
  return (
    <ActivityIndicator
      size={spec.loadingSize}
      color={colors.primary}
      {...props}
    />
  );
};

export default Spinner;
