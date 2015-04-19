/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Component
} = React;

class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Bench Pro!
        </Text>
        <Text style={styles.instructions}>
          Increase your one rep max.
        </Text>
        <Text style={styles.instructions}>
          Get stronger.
        </Text>
        <Text style={styles.instructions}>
          Be awesomeer.
        </Text>
      </View>
    );
  }
}

// class Landing extends Component {
//   render() {
//     return (
//       <Text style={styles.text}>
//         Welcome to Bench Pro!
//       </Text>
//     );
//   }
// }

class BenchPro extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Welcome',
          component: Landing
        }}/>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'blue'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
});

AppRegistry.registerComponent('BenchPro', () => BenchPro);
