import React, {Component} from 'react'
import {StyleSheet, View, ListView, Text} from 'react-native';
import {connect} from 'react-redux';
import { BlurView, VibrancyView } from 'react-native-blur';

class AutoCompleteList extends Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id}).cloneWithRows([].concat(props.results)),
    }
  }

  componentWillReceiveProps(props) {
    console.log('props: ', props);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([].concat(props.results))
    })
  }

  render () {
    // <BlurView style={styles.blur} blurType='light' blurAmount={10}/>
    return (
      <ListView
      style={styles.list}
      enableEmptySections='false'
      dataSource={this.state.dataSource}
      renderRow={rowData => {
        return (
          <View style={styles.cell}>
            <Text style={styles.text}>{rowData.description}</Text>
          </View>
        )
      }}
      />
  )}
}

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0, bottom: 0, right: 0, left: 0,
  },
  list: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    marginLeft: 30,
    marginRight: 30,
  },
  cell: {
    flexDirection: 'row',
    height: 45,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#00000050',
  },
  text: {
    textAlign: 'center',
  }
})

export default connect( ({autoComplete}) => {
  return {
    results: autoComplete.autoCompleteResults
  }
})(AutoCompleteList)
