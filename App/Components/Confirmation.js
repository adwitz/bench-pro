'use strict';

var React = require('react-native');

var {
  Component,
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} = React;

class Confirmation extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <View style={styles.container}>
        <Text style={this.message}>{this.props.message}</Text>
        <View style={styles.buttonFlow}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.props.handleDenySubmit}
            underlayColor="white">
            <Text style={styles.buttonText}> {this.props.denyText} </Text>
          </TouchableHighlight>
          <View style={styles.spacer}></View>
          <TouchableHighlight
            style={styles.button}
            onPress={this.props.handleConfirmSubmit}
            underlayColor="white">
            <Text style={styles.buttonText}> {this.props.confirmText} </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center'
  },
   buttonFlow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 3,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  message: {
    fontSize: 18,
    textAlign: 'center'
  },
  spacer: {
    flex: 1
  }
});

module.exports = Confirmation;
