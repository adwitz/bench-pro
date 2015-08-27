'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  Component,
  TouchableHighlight
} = React;

class Loading extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={styles.loadingContainer}>
        <Text>
          Workouts
        </Text>
        <ActivityIndicatorIOS
          animating={!this.props.loaded}
          color="#111"
          size="large" />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  }
});

module.exports = Loading;
