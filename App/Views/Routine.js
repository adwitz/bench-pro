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
  ListView,
  ActivityIndicatorIOS,
  Component,
  TouchableHighlight,
  Image
} = React;

class Routine extends Component {
  constructor(props){
    super(props);
    storage.getOneRepMax()
      .then((weight) => benchData.getRoutine(weight))
      .then((res) => this.handleResponseOrReroute(res))
      .done();
    this.state = {
      loaded: false
    }
  }
  handleResponseOrReroute(res){
    if (res){
      this.setState({
        loaded: true,
        max: res.max,
        workoutList: res.workouts,
        workouts: this.getWorkoutsForNav(res.workouts)
      });
    } else {
      this.props.navigator.replace({
        title: 'Set One Rep Max',
        component: SetOneRepMax,
        passProps: {message: 'Set your one rep max to unlock your custom routine'}
      });
    }
  }
  getWorkoutsForNav(workouts){
    var result = {};
    workouts.map((workout, index, workouts) => {
      if (workout.completed === false && !result.current){
        result.current = workout;
        result.previous = workouts[index - 1] || null;
        result.next = workouts[index + 1] || null;
      }
    });
    return result;
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return this.renderWorkout(this.state.workouts.current);
  }
  renderLoadingView(){
    return (
      <View style={styles.loadingContainer}>
        <Text>
          Workouts
        </Text>
        <ActivityIndicatorIOS
          animating={!this.state.loaded}
          color="#111"
          size="large" />
      </View>
    );
  }
  renderWorkout(workout){
    var status = this.getStatus(workout);
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text>Workout {workout.workout} of {this.state.workoutList.length}</Text>
          <Text>Status: {status.status}</Text>
          <TouchableHighlight
            underlayColor='#48BBEC'
            style={styles.viewWorkoutButton}>
            <View style={styles.workout}>
              <Text>{status.buttonText}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  getStatus(workout){
    var result = {}, someSetsCompleted;

    someSetsCompleted = (workout) => {
      workout.sets.reduce((previous, set) => {
        return set.completed || previous;
      }, false)
    }

    if (workout.completed){
      result.status = 'Completed';
      result.buttonText = 'View details';
    } else if (someSetsCompleted(workout)){
      result.status = 'In progress';
      result.buttonText = 'Continue';
    } else {
      result.status = 'New';
      result.buttonText = 'Begin';
    }
    return result;
  }
  workoutSelected(workout){
    console.log('workout selected: ', workout.workout);
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
  loadingContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  workout: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  workoutsContainer: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  viewWorkoutButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3
  }
});

module.exports = Routine;
