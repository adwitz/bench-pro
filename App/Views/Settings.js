'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Component,
  TouchableHighlight
} = React;

class Settings extends Component {
  constructor(props) {

  }
  showChangeOneRepMaxInput(){
    console.log('opening one rep max input');
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>
          Welcome to settings!
        </Text>
        <TouchableHighlight
            underlayColor='#48BBEC'
            style={styles.button}
            onPress={this.showChangeOneRepMaxInput}>
          <View>
            <Text>Settings, etc</Text>
          </View>
        </TouchableHighlight>
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
  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: '#48BBEC'
  },
});

module.exports = Settings;
