'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component
} = React;

class SetOneRepMax extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Set one rep max
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});

module.exports = SetOneRepMax;