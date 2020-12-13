import React from 'react';
import Spinner from './Spinner';
import {SideButton} from './Buttons/SideButton';
import {PrimaryButton} from './Buttons/PrimaryButton';
import HorizontalWrapper from './Buttons/HorizontalWrapper';

const ButtonActionSection = (props) => {
  return (
    <HorizontalWrapper>
      {props.loading.secondaryButton ? (
        <Spinner style={{paddingHorizontal: 20, paddingTop: 10}} />
      ) : props.showSecondaryButton ? (
        <SideButton
          containerStyle={{paddingHorizontal: 20, paddingTop: 10}}
          title={props.secondaryButtonText}
          onPress={props.onSecondaryButtonPress}
        />
      ) : (
        []
      )}
      {props.loading.primaryButton ? (
        <Spinner style={{paddingHorizontal: 20, paddingTop: 10}} />
      ) : (
        <PrimaryButton
          containerStyle={{paddingHorizontal: 20, paddingTop: 10}}
          title={props.primaryButtonText}
          onPress={props.onPrimaryButtonPress}
        />
      )}
    </HorizontalWrapper>
  );
};

export default ButtonActionSection;
