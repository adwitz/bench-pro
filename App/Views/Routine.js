'use strict';

var React = require('react-native');
var benchData = require('../Utils/benchData.js');
var storage = require('../Utils/storage.js');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
  Component,
} = React;


var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  }
});

class Routine extends Component {
  constructor(props){
    super(props)
      benchData.getRegimen('100').then((res) => {
      this.setState({isLoading: false});
      console.log('sucess');
    });
    this.state = {
      isLoading: true
    };
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>
          Workouts
        </Text>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111"
          size="Large"></ActivityIndicatorIOS>
      </View>
    );
  }
}

module.exports = Routine;