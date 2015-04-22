'use strict';

var React = require('react-native');

var {
  Component,
	Text,
	View,
	StyleSheet,
  TouchableHighlight
} = React;

class SquareNavButtons extends Component {
  constructor(props) {
    super(props)
  }
  navigate(button) {
    this.props.navigator.push({
      title: button.title,
      component: button.view
    })
  }
  render() {
    var leftButton = this.props.pages[0];
    var rightButton = this.props.pages[1];
    return (
      <View style={styles.flowRight}>
        <TouchableHighlight onPress={() => this.navigate(leftButton)} style={[styles.squareButton, styles.leftButton]}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>{leftButton.title}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate(rightButton)} style={[styles.squareButton, styles.rightButton]}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>{rightButton.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  squareButton: {
    height: 100,
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  leftButton: {
    marginRight: 5
  },
  rightButton: {
    marginLeft: 5
  },
});

module.exports = SquareNavButtons;