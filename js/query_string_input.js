import React, {Component} from 'react'
import {StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';

class QueryStringInput extends Component<any, any> {
  render() {
    return (
        <TextInput
        selectionColor='white'
        style={styles.searchInput}
        onChangeText={queryString => this.props.onChangeText(queryString)}
        value={this.props.queryString}
        placeholder='your query string here'
        placeholderTextColor={`#${this.props.placeholderColor}`}
        />
    )
  }
}

const styles = StyleSheet.create({
  searchInput: {
    alignSelf: 'stretch',
    flex: 1,
    color: 'white',
  }
})

const mapStateToProps = ({autoComplete}) => {
  return {
    queryString: autoComplete.queryString,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeText: queryString => dispatch({type: 'AUTO_COMPLETE_TEXT', data: queryString})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryStringInput)
