'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Component,
  TouchableHighlight
} = React;

class Instructions extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>
          Welcome to the instructions!
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});

module.exports = Instructions;
