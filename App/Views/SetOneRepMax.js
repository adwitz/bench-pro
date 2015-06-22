'use strict';

var React = require('react-native');
var validation = require('./../Utils/validation');
var storage = require('./../Utils/storage');

var {
  StyleSheet,
  Text,
  View,
  Component,
  TextInput,
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
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.weight}
            onChange={this.handleChange.bind(this)} />
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="white">
            <Text style={styles.buttonText}> Submit </Text>
          </TouchableHighlight>
        </View>
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
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 30
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
