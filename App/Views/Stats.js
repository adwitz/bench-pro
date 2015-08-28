'use strict';

var React = require('react-native');
var Storage = require('../Utils/storage');
var Constants = require('../Utils/Constants').Stats;
var BPLib = require('../Utils/BenchProLib');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Component
} = React;

class Stats extends Component {
  constructor(props) {
    super(props)
    this.setMaxHistory();
    this.state = {
      maxHistory: null
    };
  }

  componentWillMount() {

  }

  setMaxHistory() {
    Storage.getOneRepMaxHistory()
      .then((res) => {
        this.setState({
          maxHistory: res
        });
      })
      .done();
  }

  createMaxStats(maxHistory) {
    return (
      <View>
        <Text>
          {Constants.initialMax}: {maxHistory[0]}
        </Text>
        <Text>
          {Constants.currentMax}: {maxHistory[maxHistory.length - 1]}
        </Text>
        <Text>
          {Constants.bestMax}: {BPLib.findGreatestValue(maxHistory)}
        </Text>
      </View>
    );
  }

  render() {

    var maxHistory = this.state.maxHistory;

    var displayMaxData = maxHistory ? this.createMaxStats(maxHistory) : <View></View>;

    return (
      <View style={styles.mainContainer}>
        <Text>
          Stats
        </Text>
        {displayMaxData}
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
  }
});

module.exports = Stats;
