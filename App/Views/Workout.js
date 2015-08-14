'use strict';

var React = require('react-native');
var storage = require('../Utils/storage.js');
var DataStore = require('../Data/DataStore.js');
var Constants = require('../Utils/Constants.js').Workout;

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
      lastCompletedSet: -1
    };
  }
  render() {

    var workoutCompleteMessage = this.state.workoutComplete ? this.showWorkoutCompleteText() : <View></View>

    return (
      <View
        style={styles.mainContainer}>
        <Text>Welcome to the workout page</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderSet.bind(this)}
          style={styles.listView}>
        </ListView>
        {workoutCompleteMessage}
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
    if (this.state.lastCompletedSet + 1 === set.index){
      this.markSetComplete(set);
    } else if (this.state.lastCompletedSet === set.index){
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
    var workout = this.updateWorkout(set, completed)
    this.setState({
      dataSource: this.dataSource.cloneWithRows(workout.sets),
      workout: workout,
      workoutComplete: workout.completed,
      lastCompletedSet: completed ? set.index : set.index - 1
    });
    DataStore.updateWorkout(workout);
  }
  updateWorkout(set, completed){
    var workout = this.state.workout;
    set.completed = completed;
    if (completed && workout.sets.length === set.index + 1){
      workout.completed = true;
    }
    workout.sets[set.index] = set;
    return workout;
  }
  showWorkoutCompleteText(){
    return (
      <View>
        <Text>{Constants.workoutComplete}</Text>
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
