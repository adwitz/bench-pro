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
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataSource: this.dataSource.cloneWithRows(workout.sets),
      workout: workout,
      lastCompleted: -1
    };
  }
  render() {
    return (
      <View
        style={styles.mainContainer}>
        <Text>Welcome to the workout page</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderSet.bind(this)}
          style={styles.listView}>
        </ListView>
      </View>
    );
  }
  renderSet(set){
    var buttonStyle = set.completed ? [styles.setButton, styles.setComplete] : styles.setButton;
    return (
      <View>
        <TouchableHighlight
            underlayColor='#48BBEC'
            style={buttonStyle}
            onPress={this.setPressed.bind(this, set)}>
          <View>
            <Text>Reps: {set.reps}</Text>
            <Text>Weight: {set.weight}</Text>
            <Text>Completed: {String(set.completed)}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  setPressed(set){
    console.log('set pressed: ', this.state.lastCompleted + 1, ' ', set.index);
    if (this.state.lastCompleted + 1 === set.index){
      this.markSetComplete(set);
    } else if (this.state.lastCompleted === set.index){
      this.markSetIncomplete(set);
    }
  }
  markSetComplete(set){
    this.updateStateForWorkout(set, true);
  }
  markSetIncomplete(set){
    this.updateStateForWorkout(set, false)
  }
  updateStateForWorkout(set, completed){
    var workout = this.updateSet(set, completed)
    this.setState({
      dataSource: this.dataSource.cloneWithRows(workout.sets),
      workout: workout,
      lastCompleted: completed ? set.index : set.index - 1
    });
    // storage.logLastWork
  }
  updateSet(set, completed){
    var workout = this.state.workout;
    set.completed = completed;
    workout.sets[set.index] = set;
    return workout;
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
  },
  setButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: '#48BBEC'
  },
  setComplete: {
    backgroundColor: 'green'
  }
});

module.exports = Workout;
