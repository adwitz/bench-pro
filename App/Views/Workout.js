'use strict';

var React = require('react-native');
var storage = require('../Utils/storage');
var DataStore = require('../Data/DataStore');
var Constants = require('../Utils/Constants').Workout;
var GConstants = require('../Utils/Constants').Global;
var Validation = require('../Utils/validation');
var InputWithButton = require('../Components/InputWithButton');
var Confirm = require('../Components/Confirmation');

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

  getEmptyView(){
    return <View></View>;
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
      workoutComplete: workout.completed && !this.isFailureSet(set),
      lastCompletedSet: completed ? set.index : set.index - 1,
      displayFailureInput: this.isFailureSet(set) && completed
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
      <View>
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
        confirmText={Constants.confirm}
        denyText={Constants.deny}
        handleConfirmSubmit={this.handleConfirmSubmit.bind(this)}
        handleDenySubmit={this.handleDenySubmit.bind(this)}
        message={this.state.maxChangeMessage}>
      </Confirm>
    );
  }

  handleConfirmSubmit(){
    DataStore.changeOneRepMax(this.state.maxChangeAmount, this.props.triggerDataRefresh);
  }

  handleDenySubmit(){
    this.setState({
      maxChangeMessage: null,
      workoutComplete: true
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
      workoutComplete: true,
      error: false
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
    return this.state.displayFailureInput ? this.showFailureInput() : this.getEmptyView();
  }

  showWorkoutCompleteMessageIfNecessary(){
    return this.state.workoutComplete ? this.showWorkoutCompleteText() : this.getEmptyView();
  }

  render() {

    var failureRepInput = this.showFailureRepInputIfNecessary();
    var workoutCompleteMessage = this.showWorkoutCompleteMessageIfNecessary();
    var confirmation = this.state.maxChangeMessage ? this.getMaxChangeConfirmation() : this.getEmptyView();

    return (
      <View
        style={styles.mainContainer}>
        <Text>Welcome to the workout page</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderSet.bind(this)}
          style={styles.listView}>
        </ListView>
        {failureRepInput}
        {workoutCompleteMessage}
        {confirmation}
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
  },
  negativeSet: {
    backgroundColor: 'yellow'
  },
  failureSet: {
    backgroundColor: 'red'
  }
});

module.exports = Workout;
