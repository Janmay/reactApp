import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {messages} from './data-source';

export default class LargeList extends React.Component {
  componentDidMount() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    }).then(r => {
      console.log(r);
    });
  }

  keyExtractor = (item: (typeof messages)[number], index: number) => `${index}`;

  renderItem = ({item}: {item: (typeof messages)[number]}) => {
    return (
      <TouchableOpacity style={{height: 88, backgroundColor: '#fff'}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item.icon}
            style={{marginLeft: 16, width: 44, height: 44}}
          />
          <View style={{marginLeft: 4}}>
            <Text style={{fontSize: 18}}>{item.title}</Text>
            <Text style={{fontSize: 14, marginTop: 8}}>{item.subtitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        data={messages}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        getItemLayout={(data, index) => ({
          length: 88,
          offset: 88 * index,
          index,
        })}
      />
    );
  }
}
