'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Component,
  TextInput,
  TouchableHighlight
} = React;

class OneRepMax extends Component {
  constructor(props){
    super(props);
    this.state = {
      // weight: '100'
    }
  }
  onWeightInputChange(event){
    this.setState({weight: event.nativeEvent.text});
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>
          Set your one rep max!
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.weightInput}
            placeholder="Enter your one rep max"
            value={this.state.weight}
            onChange={this.onWeightInputChange.bind(this)}/>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>
              Submit
            </Text>
          </TouchableHighlight>
        </View>
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
  },
  inputContainer: {
    flexDirection: 'row'
  },
  weightInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  button: {
    height: 36,
    color: '#48BBEC',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderRadius: 8,
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
});

module.exports = OneRepMax;
