'use strict';

var React = require('react-native');
var storage = require('../Utils/storage');
var DataStore = require('../Data/DataStore');
var Constants = require('../Utils/Constants').Workout;
var GConstants = require('../Utils/Constants').Global;
var Validation = require('../Utils/validation');
var InputWithButton = require('../Components/InputWithButton');
var Confirm = require('../Components/Confirmation');
var Timer = require('../Components/Timer');
var BPLib = require('../Utils/BenchProLib');

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
      lastCompletedSet: this.getLastCompletedSet(workout.sets),
      failureReps: '',
      error: false,
      maxChangeMessage: null
    };
  }

  getLastCompletedSet(sets){
    var lastCompleted = -1;
    sets.map((set) => {
      if (set.completed) {
        lastCompleted = set.index;
      }
    });
    return lastCompleted;
  }

  renderSet(set){

    var buttonStyle = this.getButtonStyles(set, styles);

    return (
      <View>
        <TouchableHighlight
            underlayColor='#48BBEC'
            style={buttonStyle}
            onPress={this.setPressed.bind(this, set)}>
          <View>
            <Text>Reps: {set.reps}</Text>
            <Text>Weight: {set.weight}</Text>
            <Text>Type: {set.type}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  getButtonStyles(set, styles){

    var styleList =[styles.setButton];

    if (set.completed) {
      styleList.push(styles.setComplete);
    } else if (set.type === GConstants.negative) {
      styleList.push(styles.negativeSet);
    } else if (set.type === GConstants.failure) {
      styleList.push(styles.failureSet);
    }

    return styleList;
  }

  setPressed(set){

    if (this.state.maxChangeMessage) {
      return;
    }

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
      displayFailureInput: this.isFailureSet(set) && completed,
      lastCompletedSet: completed ? set.index : set.index - 1,
      runTimer: completed && !workout.completed,
      workout: workout,
      workoutComplete: workout.completed,
      showWorkoutCompleteText: workout.completed && !this.isFailureSet(set),
    });

    DataStore.updateWorkout(workout);
  }

  updateWorkout(set, completedStatus){
    var workout = this.state.workout;
    set.completed = completedStatus;
    if (completedStatus && workout.sets.length === set.index + 1) {
      workout.completed = true;
    } else {
      workout.completed = false;
    }
    workout.sets[set.index] = set;
    return workout;
  }

  isFailureSet(set){
    if (set.type === GConstants.failure){
      this.resetRepInput();
      return true;
    }
    return false;
  }

  showWorkoutCompleteText(){
    return (
      <View style={styles.workoutComplete}>
        <Text>{Constants.workoutComplete}</Text>
      </View>
    );
  }

  showFailureInput(){
    return (
      <InputWithButton
        value={this.state.failureReps}
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        buttonText={GConstants.submit}
        message={Constants.howManyReps}
        error={this.state.error}
        success={this.state.success}>
      </InputWithButton>
    );
  }

  handleChange(event){
    this.setState({
      failureReps: event.nativeEvent.text
    });
  }

  handleSubmit(){
    var failureReps = this.state.failureReps;
    if (Validation.isValidNumber(failureReps)) {
      this.hideRepInput();
      this.evaluateNumberOfReps(Number(failureReps));
    } else {
      this.showErrorMessage(GConstants.invalidNumber);
    }
  }

  evaluateNumberOfReps(reps){
    if (reps >= 5) {
      this.promptToIncrease1RM();
    } else if(reps >= 2) {
      this.setWorkoutCompleteState();
    } else {
      this.promptToDecrease1RM();
    }
  }

  promptToIncrease1RM(){
    this.showRepChangeConfirmation(Constants.increase1RM, 5);
  }

  promptToDecrease1RM(){
    this.showRepChangeConfirmation(Constants.decrease1RM, -5);
  }

  getMaxChangeConfirmation(){
    return (
      <Confirm
        optionOneText={Constants.confirm}
        denyText={Constants.deny}
        handleOptionOne={this.setWorkoutCompleteState.bind(this)}
        handleDenySubmit={this.setWorkoutCompleteState.bind(this)}
        message={this.state.maxChangeMessage}>
      </Confirm>
    );
  }

  handleConfirmSubmit(){
    DataStore.changeOneRepMax(this.state.maxChangeAmount, this.props.triggerDataRefresh)
      .then((res) => {
        if (res.success) {
          this.setWorkoutCompleteState();
        }
      });
  }

  showRepChangeConfirmation(message, pounds){
    this.setState({
      maxChangeMessage: message,
      maxChangeAmount: pounds
    });
  }

  hideRepInput(){
    this.setState({
      displayFailureInput: false
    });
  }

  setWorkoutCompleteState(){
    this.setState({
      displayFailureInput: false,
      error: false,
      maxChangeMessage: null,
      showWorkoutCompleteText: true,
    });
  }

  showErrorMessage(message){
    this.setState({
      error: message
    });
  }

  resetRepInput(){
    this.setState({
      error: false,
      failureReps: ''
    });
  }

  showFailureRepInputIfNecessary(){
    return this.state.displayFailureInput ? this.showFailureInput() : BPLib.createEmptyView();
  }

  showWorkoutCompleteMessageIfNecessary(){
    return this.state.showWorkoutCompleteText ? this.showWorkoutCompleteText() : BPLib.createEmptyView();
  }

  render() {
    var failureRepInput = this.showFailureRepInputIfNecessary();
    var workoutCompleteMessage = this.showWorkoutCompleteMessageIfNecessary();
    var confirmation = this.state.maxChangeMessage ? this.getMaxChangeConfirmation() : BPLib.createEmptyView();
    var timer = this.state.runTimer ? <Timer duration="10" run={this.state.runTimer} id={this.state.lastCompletedSet}/> : BPLib.createEmptyView();

    return (
      <View style={styles.mainContainer}>
        <View style={styles.top}>
          {failureRepInput}
          {confirmation}
          {workoutCompleteMessage}
          {timer}
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderSet.bind(this)}
          style={styles.listView}>
        </ListView>
        <View style={styles.bottom}>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  listView: {
    flex: 3,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  setButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: '#48BBEC'
  },
  top: {
    marginTop: 35,
    flex: 1
  },
  bottom: {
    flex: 1
  },
  setComplete: {
    backgroundColor: 'green'
  },
  negativeSet: {
    backgroundColor: 'yellow'
  },
  failureSet: {
    backgroundColor: 'red'
  }
});

module.exports = Workout;
