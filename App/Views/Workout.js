'use strict';

var React = require('react-native');
var storage = require('../Utils/storage.js');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Component,
  TouchableHighlight,
  Image
} = React;

class Workout extends Component {
  constructor(props){
    super(props);
    var workout = this.props.workout;
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataSource: dataSource.cloneWithRows(workout.sets),
      workout: workout
    };
  }
  render() {
    return (
      <View
        style={styles.mainContainer}>
        <Text>Welcome to the workout page</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderSet}
          style={styles.listView}>
        </ListView>
      </View>
    );
  }
  renderSet(set){
    return (
      <View>
        <Text>Reps: {set.reps}</Text>
        <Text>Weight: {set.weight}</Text>
        <Text>Completed: {String(set.completed)}</Text>
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
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
});

module.exports = Workout;
