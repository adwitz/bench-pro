'use strict';

var React = require('react-native');
var Validation = require('../Utils/validation');
var DataStore = require('../Data/DataStore');
var Storage = require('../Utils/storage');
var InputWithButton = require('../Components/InputWithButton');
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
    console.log(this.state.weight, ' ', this.state.storedMax);
    if (Number(this.state.weight) === this.state.storedMax) {
      this.setErrorState(`${Constants.sameMax} ${this.state.weight}${GConstants.lbs}`);
    } else if (this.state.storedMax){
      //open up confirmation
    } else {
      this.validateAndSetOneRepMax();
    }

  }

  validateAndSetOneRepMax() {
    var weight = this.state.weight;
    if (Validation.weightIsValid(weight)){
      Storage.setOneRepMax(weight)
        .then(() => this.saveOneRepMaxSuccess(weight))
        .done();
    } else {
      this.setErrorState(Validation.getErrorMessage(this.state.weight));
    }
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
    })
  }
  clearErrorState(){
    this.setState({
      error: false
    })
  }
  setSuccessState(message){
    this.setState({
      error: false,
      success: message
    });
  }
  clearSuccessState(){
    this.setState({
      success: false
    })
  }
  render() {

    if (!this.state.loaded) {
      return <Loading />
    }

    return (
      <View style={styles.container}>
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
}

var styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});

module.exports = SetOneRepMax;
