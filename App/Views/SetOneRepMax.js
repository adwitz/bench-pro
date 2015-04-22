'use strict';

var React = require('react-native');
var validation = require('./../Utils/validation');

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
    this.state={
      weight: '',
      error: false
    }
  }
  handleChange(event){
    this.setState({
      weight: event.nativeEvent.text
    });
  }
  handleSubmit(){
    console.log('handling submit: ', this.state.weight);
    if (validation.weightIsValid(this.state.weight)){
      //add to async storage and show success
      this.setState({
        error: false
      });
      console.log('inside success');

    } else {
      this.setState({
        error: validation.getErrorMessage(this.state.weight)
      })
    }
  }
  render() {
    var showErr = (
      this.state.error ? <Text style={styles.error}> {this.state.error} </Text> : <View></View>
    );
    return (
      <View style={styles.container}>
        <Text>
          Set one rep max
        </Text>
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
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center'
  }
});

module.exports = SetOneRepMax;