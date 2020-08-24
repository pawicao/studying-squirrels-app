import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Spinner = (props) => {
  const {colors, spec} = useTheme();
  return <ActivityIndicator {...props} size={spec.loadingSize} color={colors.primary} />;
};

export default Spinner;
