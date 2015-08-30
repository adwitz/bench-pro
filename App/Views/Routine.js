'use strict';

var React = require('react-native');
var benchData = require('../Utils/benchData.js');
var storage = require('../Utils/storage.js');
var Workout = require('./Workout');
var Loading = require('./Loading');
var DataStore = require('../Data/DataStore.js');
var Constants = require('../Utils/Constants.js').Routine;
var BPLib = require('../Utils/BenchProLib');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  Component,
  TouchableHighlight,
  NavigatorIOS
} = React;

class Routine extends Component {
  constructor(props){
    super(props);
    this.loadWorkouts();
    this.state = {
      loaded: false
    }
  }
  loadWorkouts(){
    DataStore.getRoutine()
      .then((res) => this.handleResponse(res))
      .catch((err) => console.log(err))
      .done();
  }
  handleResponse(res){
    if (res){
      this.setState({
        max: res.max,
        workouts: res.workouts,
        workoutNav: this.getWorkoutsForNav(res.workouts)
      });
    }
    this.setLoadedState(true);
  }
  setLoadedState(state) {
    this.setState({
      loaded: state
    })
  }
  render() {
    if (!this.state.loaded) {
      return <Loading />;
    } else if (this.state.workoutNav) {
      return this.renderWorkout(this.state.workoutNav.current);
    } else {
      return this.renderOneRepMaxNotSet();
    }

  }
  renderOneRepMaxNotSet() {
    return (
      <View style={styles.mainContainer}>
        <Text>
          Set your one rep max to see your customized workout.
        </Text>
      </View>
    );
  }
  renderWorkout(workout) {
    var status = this.getStatus(workout);
    var workouts = this.state.workouts;
    var nextButton = this.getNextWorkoutElement(workout, workouts);
    var prevButton = this.getPrevWorkoutElement(workout);
    var allWorkoutsComplete = this.getBenchProCompletedView(workout);

    return (
      <View style={styles.mainContainer}>
        {allWorkoutsComplete}
        <View style={styles.workoutsContainer}>
          <Text>Workout {workout.number} of {workouts.length}</Text>
          <Text>Status: {status.status}</Text>
          <TouchableHighlight
            underlayColor='#48BBEC'
            style={styles.viewWorkoutButton}
            onPress={this.workoutSelected.bind(this)}>
            <View style={styles.workout}>
              <Text>{status.button}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.changeWorkoutContainer}>
          {prevButton}
          <View style={styles.changeButtonSpacer3}></View>
          {nextButton}
        </View>
      </View>
    );
  }
  getWorkoutsForNav(workouts){
    var result = {};
    workouts.map((workout, index, workouts) => {
      if (this.isNextWorkout(workout, result) || this.isCompleteFinalWorkout(workout, workouts)){
        result.current = workout;
        result.previous = workouts[index - 1] || null;
        result.next = workouts[index + 1] || null;
      }
    });
    return result;
  }
  getStatus(workout){
    var result;
    if (workout.completed){
      result = this.getTextsForStatus(Constants.completeStatus, Constants.completeStatusButton);
    } else if (this.someSetsCompleted(workout)){
      result = this.getTextsForStatus(Constants.incompleteStatus, Constants.incompleteStatusButton);
    } else {
      result = this.getTextsForStatus(Constants.newStatus, Constants.newStatusButton);
    }
    return result;
  }
  someSetsCompleted(workout){
    return workout.sets.reduce((previous, set) => {
      return set.completed || previous;
    }, false);
  }
  getTextsForStatus(status, button){
    return {
      status: status,
      button: button
    }
  }
  getNextWorkoutElement(workout, workouts){
    return (this.displayNextWorkoutButton(workout, workouts) ?
      this.createChangeWorkoutWorkoutButton({
        text: 'next',
        style: styles.changeWorkoutButton,
        direction: 1
      }) :
      this.createHiddenButtonView()
    );
  }
  getPrevWorkoutElement(workout){
    return (this.displayPrevWorkoutButton(workout) ?
      this.createChangeWorkoutWorkoutButton({
        text: 'prev',
        style: styles.changeWorkoutButton,
        direction: -1
      }) :
      this.createHiddenButtonView()
    );
  }
  displayNextWorkoutButton(workout, workouts) {
    return workout.id < workouts.length - 1 ? true : false;
  }
  displayPrevWorkoutButton(workout, workouts) {
    return workout.id === 0 ? false : true;
  }
  getBenchProCompletedView(workout) {
    if (this.isCompleteFinalWorkout(workout)) {
      return this.createResetWorkoutButton();
    }
    return BPLib.createEmptyView();
  }
  createResetWorkoutButton() {
    return (
      <View>
        <Text>{Constants.workoutsComplete}</Text>
      </View>
    );
  }
  isCompleteFinalWorkout(workout, workouts) {
    return workout.completed && this.isFinalWorkout(workout, workouts);
  }
  isFinalWorkout(workout, workouts) {
    workouts = workouts || this.state.workouts;
    return workout.id === workouts.length - 1;
  }
  finalWorkoutIsCompleted() {
    return this.isFinalWorkout(workout) && workout.completed;
  }
  isNextWorkout(workout, result) {
    return workout.completed === false && !result.current;
  }
  createChangeWorkoutWorkoutButton(config){
    return (
      <TouchableHighlight
        underlayColor="#F5FCFF"
        style={config.style}
        onPress={this.changeWorkout.bind(this, config.direction)}>
        <Text>{config.text}</Text>
      </TouchableHighlight>
    );
  }
  createHiddenButtonView(){
    return (
      <View style={styles.changeButtonSpacer1}></View>
    );
  }
  changeWorkout(direction){
    var currentWorkoutIndex = this.state.workoutNav.current.id;
    var newWorkoutIndex = currentWorkoutIndex + direction;
    var workouts = this.state.workoutList;
    this.setState({
      workouts: {
        current: workouts[newWorkoutIndex],
        previous: workouts[newWorkoutIndex - 1] || null,
        next: workouts[newWorkoutIndex + 1] || null
      }
    });
  }
  triggerDataRefresh(){
    this.loadWorkouts();
  }
  workoutSelected(){
    var workout = this.state.workoutNav.current;
    this.props.navigator.push({
      title: 'Workout',
      component: Workout,
      passProps: {
        workout: workout,
        triggerDataRefresh: this.triggerDataRefresh.bind(this)
      }
    });
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
    marginTop: 150,
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  viewWorkoutButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3
  },
  changeWorkoutContainer: {
    height: 30,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF'
  },
  changeWorkoutButton: {
    justifyContent: 'center',
    flex: 1
  },
  changeButtonSpacer1: {
    flex:1
  },
  changeButtonSpacer3: {
    flex: 3
  }
});

module.exports = Routine;
