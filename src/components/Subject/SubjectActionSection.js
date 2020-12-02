import React from 'react';
import Spinner from '../ui/Spinner';
import {SideButton} from '../ui/Buttons/SideButton';
import {PrimaryButton} from '../ui/Buttons/PrimaryButton';
import HorizontalWrapper from '../ui/Buttons/HorizontalWrapper';

const SubjectActionSection = (props) => {
  return (
    <HorizontalWrapper>
      {props.loading.removeButton ? (
        <Spinner style={{paddingHorizontal: 20, paddingTop: 10}} />
      ) : props.showRemovalButton ?(
        <SideButton
          containerStyle={{paddingHorizontal: 20, paddingTop: 10}}
          title="Remove"
          onPress={props.onRemove}
        />
      ) : []}
      {props.loading.addButton ? (
        <Spinner style={{paddingHorizontal: 20, paddingTop: 10}} />
      ) : (
        <PrimaryButton
          containerStyle={{paddingHorizontal: 20, paddingTop: 10}}
          title="Confirm"
          onPress={props.onConfirm}
        />
      )}
    </HorizontalWrapper>
  );
};

export default SubjectActionSection;
