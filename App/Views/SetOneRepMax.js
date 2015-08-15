'use strict';

var React = require('react-native');
var validation = require('../Utils/validation');
var storage = require('../Utils/storage');
var InputWithButton = require('../Components/InputWithButton');
var GConstants = require('../Utils/Constants').Global;

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
    this.state={
      weight: '',
      error: false,
      message: props.message
    }
  }
  handleChange(event){
    this.setState({
      weight: event.nativeEvent.text
    });
  }
  handleSubmit(){
    var weight = this.state.weight;
    if (validation.weightIsValid(weight)){
      storage.setOneRepMax(weight)
        .then(() => this.saveOneRepMaxSuccess(weight))
        .done();
    } else {
      this.setErrorState(validation.getErrorMessage(this.state.weight));
    }
  }
  saveOneRepMaxSuccess(weight){
    this.setSuccessState('One rep max saved!');
    storage.setRoutineForOneRepMax(weight);
  }
  saveOneRepMaxError(err){
    console.log('failed to save 1rm: ', err);
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
    return (
      <View style={styles.container}>
        <Text>
          Set one rep max
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
