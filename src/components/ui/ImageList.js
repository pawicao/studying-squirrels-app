import React, {useState} from 'react';
import {Modal, ScrollView, View, Image, TouchableHighlight} from 'react-native';
import {API_BASEURL} from '../../env/env';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {ImageViewer} from 'react-native-image-zoom-viewer';

const ImageList = (props) => {
  const {colors} = useTheme();
  let addImage = null;
  const [modalState, setModalState] = useState({show: false, index: null});

  if ((!props.images || !props.images.length) && !props.editable) {
    return null;
  }
  if (props.editable) {
    addImage = (
      <Icon
        size={50}
        style={{marginTop: 10}}
        color={colors.dimmedText}
        onPress={props.onAdd}
        name="plus-circle"
      />
    );
  }
  return (
    <View style={{paddingHorizontal: 10}}>
      <Modal
        transparent
        visible={modalState.show}
        onRequestClose={() => setModalState({show: false, index: null})}>
        <ImageViewer
          onCancel={() => setModalState({show: false, index: null})}
          enableSwipeDown
          imageUrls={props.images.map((item) => ({
            url: API_BASEURL + item.filePath,
          }))}
          index={modalState.index}
        />
      </Modal>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {addImage}
        {props.images.map((item, index) => {
          const uri = API_BASEURL + item.filePath;
          return (
            <View
              key={`attachment-${index}`}
              style={{width: 50, marginTop: 10, marginHorizontal: 5}}>
              <TouchableHighlight
                onPress={() => setModalState({show: true, index: index})}>
                <Image
                  source={{uri: uri}}
                  style={{width: 50, height: 50, borderRadius: 5}}
                />
              </TouchableHighlight>
              {props.editable && (
                <Icon
                  color={colors.redText}
                  onPress={() => props.onDelete(item)}
                  name="close-circle"
                  size={20}
                  style={{position: 'absolute', top: -5, right: -5}}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ImageList;
