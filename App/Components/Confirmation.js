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

  renderColumnOne() {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={this.props.handleDenySubmit}
        underlayColor="white">
        <Text style={styles.buttonText}> {this.props.denyText} </Text>
      </TouchableHighlight>
    );
  }

  renderColumnTwo(threeButtons) {
    if (threeButtons) {
      return this.renderOptionOne();
    } else {
      return (
        <View style={styles.spacer}></View>
      );
    }
  }

  renderColumnThree(threeButtons) {
    if (threeButtons) {
      return this.renderOptionTwo();
    } else {
      return this.renderOptionOne();
    }
  }

  renderOptionOne() {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={this.props.handleOptionOne}
        underlayColor="white">
        <Text style={styles.buttonText}> {this.props.optionOneText} </Text>
      </TouchableHighlight>
    );
  }

  renderOptionTwo() {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={this.props.handleOptionTwo}
        underlayColor="white">
        <Text style={styles.buttonText}> {this.props.optionTwoText} </Text>
      </TouchableHighlight>
    );
  }

  renderConfirmationElements() {

    var threeButtons = this.props.threeButtons === 'true';

    return [
      this.renderColumnOne(),
      this.renderColumnTwo(threeButtons),
      this.renderColumnThree(threeButtons)
    ];
  }

  render() {

    var [columnOne, columnTwo, columnThree] = this.renderConfirmationElements();

    return (
      <View style={styles.container}>
        <Text style={this.message}>{this.props.message}</Text>
        <View style={styles.buttonFlow}>
          {columnOne}
          {columnTwo}
          {columnThree}
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
    margin: 5,
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
