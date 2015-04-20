'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Component
} = React;

class Routine extends Component {
  render() {
    return (
      <View>
        <Text>
          Welcome to Bench Pro!
        </Text>
      </View>
    );
  }
}

module.exports = Routine;