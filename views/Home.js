'use strict';

var React = require('react-native');
var Routine = require('./Routine');
var Stats = require('./Stats');
var OneRepMax = require('./OneRepMax');
var Settings = require('./Settings');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Component,
  TextInput,
  TouchableHighlight
} = React;

class SquareButtons extends Component {
  constructor(props) {
    super(props)
  }
  navigate(button) {
    console.log('called navigate');
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

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      top: [{title: 'Set One Rep Max', view: OneRepMax}, {title: 'Workouts', view: Routine}],
      bottom: [{title: 'Stats', view: Stats}, {title: 'Settings', view: Settings}]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Bench Pro!
        </Text>
        <Text style={styles.instructions}>
          Increase your one rep max.
        </Text>
        <Text style={styles.instructions}>
          Get stronger.
        </Text>
        <Text style={styles.instructions}>
          Be awesomer.
        </Text>
        <SquareButtons pages={this.state.top} navigator={this.props.navigator}/>
        <SquareButtons pages={this.state.bottom} navigator={this.props.navigator}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'blue'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
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
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
  }
});

module.exports = Home;