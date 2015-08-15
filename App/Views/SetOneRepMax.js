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
    console.log('props ', props);
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
    console.log('saved 1rm ');
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
    var showErr = (
      this.state.error ? <Text style={[styles.messages, styles.error]}> {this.state.error} </Text> : <View></View>
    );
    var showSuccess = (
      this.state.success ? <Text style={[styles.messages, styles.success]}> {this.state.success} </Text> : <View></View>
    );
    var passedMessage = (
      this.state.message ? <Text style={[styles.messages, styles.error]}> {this.state.message} </Text> : <View></View>
    );
    return (
      <View style={styles.container}>
        <Text>
          Set one rep max
        </Text>
        {passedMessage}
        <InputWithButton
          value={this.state.weight}
          handleChange={this.handleChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          buttonText={GConstants.submit}>
        </InputWithButton>
        {showErr}
        {showSuccess}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  messages: {
    fontSize: 18,
    textAlign: 'center'
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green'
  }
});

module.exports = SetOneRepMax;
