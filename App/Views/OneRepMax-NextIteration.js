'use strict';

var React = require('react-native');
var SquareNavButtons = require('./../Components/SquareNavButtons');
var FindOneRepMax = require('./FindOneRepMax');
var SetOneRepMax = require('./SetOneRepMax');

var {
  StyleSheet,
  Text,
  View,
  Component
} = React;

class OneRepMax extends Component {
  constructor(props){
    super(props)
    this.state = {
      buttons: [{title: 'Find One Rep Max', view: FindOneRepMax}, {title: 'Set One Rep Max', view: SetOneRepMax}]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Set one rep max
        </Text>
        <View>
          <SquareNavButtons pages={this.state.buttons} navigator={this.props.navigator}></SquareNavButtons>
        </View>
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

module.exports = OneRepMax;