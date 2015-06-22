'use strict';

var React = require('react-native');
var benchData = require('../Utils/benchData.js');
var storage = require('../Utils/storage.js');
var SetOneRepMax = require('./SetOneRepMax');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
  Component
} = React;

class Routine extends Component {
  constructor(props){
    super(props);
    storage.getOneRepMax()
      .then((weight) => benchData.getRoutine(weight))
      .then((res) => this.handleResponseOrReroute(res))
      .done();
    this.state = {
      isLoading: true
    };
  }
  handleResponseOrReroute(res){
    if (res){
      this.setState({isLoading: false});
    } else {
      this.props.navigator.replace({
        title: 'Set One Rep Max',
        component: SetOneRepMax,
        passProps: {message: 'Set your one rep max to unlock your custom routine'}
      });
    }
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
          size="large"></ActivityIndicatorIOS>
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
    backgroundColor: '#48BBEC'
  }
});

module.exports = Routine;
