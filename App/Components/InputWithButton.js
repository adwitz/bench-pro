'use strict';

var React = require('react-native');

var {
  Component,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight
} = React;

class InputWithButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.flowRight}>
        <TextInput
          style={styles.searchInput}
          value={this.props.value}
          onChange={this.props.handleChange} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.props.handleSubmit}
          underlayColor="white">
          <Text style={styles.buttonText}> {this.props.buttonText} </Text>
        </TouchableHighlight>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 30
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = InputWithButton;
