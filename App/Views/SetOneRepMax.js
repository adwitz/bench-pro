'use strict';

var React = require('react-native');
var Validation = require('../Utils/validation');
var DataStore = require('../Data/DataStore');
var Storage = require('../Utils/storage');
var InputWithButton = require('../Components/InputWithButton');
var Confirmation = require('../Components/Confirmation');
var Loading = require('../Views/Loading');
var Constants = require('../Utils/Constants').OneRepMax;
var GConstants = require('../Utils/Constants').Global;
var Promise = require('bluebird');

var {
  StyleSheet,
  Text,
  View,
  Component,
  TouchableHighlight
} = React;

class SetOneRepMax extends Component {
  constructor(props){
    super(props)
    this.loadUserData();
    this.state={
      weight: '',
      error: false,
      message: '',
      loaded: false
    }
  }

  handleChange(event){
    this.setState({
      weight: event.nativeEvent.text
    });
  }

  loadUserData() {
    Promise.try(() => {
      return Promise.join(
        DataStore.getOneRepMax(),
        DataStore.getLastCompletedWorkout()
      );
    }).then((response) => {
      var [oneRepMax, lastCompletedWorkout] = response;
      this.showInstructionsAndSetStoredMax(oneRepMax);
      this.setLastCompletedWorkout(lastCompletedWorkout);
      this.initialLoadComplete();
    })
    .catch((err) => {
      console.log('this better be good:', err);
    });

  }

  initialLoadComplete() {
    this.setState({
      loaded: true
    });
  }

  setLastCompletedWorkout(index) {
    this.setState({
      lastCompletedWorkout: index
    });
  }

  showInstructionsAndSetStoredMax(weight) {
    if (weight) {
      this.setState({
        maxChangeMessage: Constants.updateOneRepMax,
        storedMax: weight
      });
    } else {
      this.setState({
        maxChangeMessage: Constants.setOneRepMax
      });
    }
  }

  handleSubmit(){

    if (this.isSameMax()) {
      this.setErrorState(`${Constants.sameMax} ${this.state.weight}${GConstants.lbs}`);
    } else if (!Validation.weightIsValid(this.state.weight)) {
      this.setErrorState(Validation.getErrorMessage(this.state.weight));
    } else if (this.state.storedMax) {
      this.showChangeConfirm();
    } else {
      this.setOneRepMax();
    }

  }

  showChangeConfirm() {
    this.setState({
      confirmChange: true
    });
  }

  isSameMax() {
    return Number(this.state.weight) === this.state.storedMax;
  }

  confirmUpdateOrReset() {
    this.setState({
      confirmUpdateOrRest: true
    });
  }

  setOneRepMax() {
    var weight = this.state.weight;
    return Storage.setOneRepMax(weight)
      .then(() => this.saveOneRepMaxSuccess(weight))
      .catch(() => {
        this.saveOneRepMaxError('Something went wrong please try again');
      })
      .done();
  }

  saveOneRepMaxSuccess(weight){
    this.setSuccessState(Constants.maxSaved);
    DataStore.setRoutineForOneRepMax(weight);
  }

  saveOneRepMaxError(err){
    this.setErrorState(`${Constants.saveError}: ${err}`);
  }

  setErrorState(message){
    this.setState({
      error: message,
      success: false
    });
  }

  clearErrorState(){
    this.setState({
      error: false
    });
  }

  setSuccessState(message){
    this.setState({
      error: false,
      success: message,
      confirmChange: false
    });
  }

  clearSuccessState(){
    this.setState({
      success: false
    });
  }

  handleDenySubmit() {
    console.log('Deny');
  }

  handleRoutineReset() {

    Promise.try(() => {
      return Promise.join(
        Storage.clearRoutine(),
        this.setOneRepMax()
      );
    }).then((response) => {
      this.setSuccessState(Constants.maxSaved);
      console.log('all is good: ', response);
    })
    .catch((err) => {
      console.log('this better be good:', err);
    });

    console.log('Reset');
  }

  handleRoutineUpdate() {
    console.log('Update');
  }

  renderConfirm() {
    return (
      <Confirmation
        threeButtons="true"
        message={Constants.workoutsInProgress}
        denyText={GConstants.cancel}
        handleDenySubmit={this.handleDenySubmit.bind(this)}
        optionOneText={GConstants.reset}
        handleOptionOne={this.handleRoutineReset.bind(this)}
        optionTwoText={GConstants.update}
        handleOptionTwo={this.handleRoutineUpdate.bind(this)}
      />
    );
  }

  renderInputWithButton() {
    return (
     <View style={styles.inputView}>
      <Text>
        {this.state.maxChangeMessage}
      </Text>
      <InputWithButton
        value={this.state.weight}
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        buttonText={GConstants.submit}
        error={this.state.error}
        success={this.state.success}
        message={this.state.message}>
      </InputWithButton>
     </View>
    );
  }

  render() {

    var content;

    if (!this.state.loaded) {
      return <Loading />
    }

    if (this.state.confirmChange) {
      content = this.renderConfirm();
    } else if (this.state.success) {
      content = (<Text>About time</Text>);
    } else {
      content = this.renderInputWithButton();
    }

    return (
      <View style={styles.mainContainer}>
        {content}
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
  inputView: {
    alignSelf: 'stretch',
    alignItems: 'center'
  }
});

module.exports = SetOneRepMax;
