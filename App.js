
//  @flow

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './js/store';
import {Color} from './js/colors';
import QueryStringInput from './js/query_string_input'
import AutoCompleteList from './js/autocomplete_list'
import Icon from 'react-native-vector-icons/FontAwesome';

const BACKGROUND_COLOR = Color('C8DEFF');
const backgroundColor = BACKGROUND_COLOR.multiplyByConstant(1);
const iconColor = backgroundColor.multiplyByConstant(.85);
const queryBackgroundColor = backgroundColor.multiplyByConstant(.5);

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    const {store, persistor} = configureStore();
    this.state = {store, persistor, autoCompleteResults: [], queryString: ''};
  }

  componentWillUpdate (props, nextState) {
    console.log('arguments:' , arguments);
    this.store.dispatch({type: 'AUTO_COMPLETE_TEXT', data: nextState.queryString})
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Icon name='map' size={150} color={`#${iconColor}`} />
          </View>

          <View style={styles.queryContainer}>
            <QueryStringInput placeholderColor={backgroundColor.multiplyByConstant(.95)}/>
          </View>

          <AutoCompleteList  />

        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: `#${backgroundColor}`,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  queryContainer: {
    borderColor: '#aaaaaa',
    borderWidth: 1,
    alignSelf: 'stretch',
    backgroundColor: `#${queryBackgroundColor}`,
    margin: 12,
    marginTop:35,
    height: 40,
    borderRadius: 20,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8
  }
});
