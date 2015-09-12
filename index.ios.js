'use strict';

var React = require('react-native');
var Home = require('./App/Views/Home');
var Routine = require('./App/Views/Routine');
var SetOneRepMax = require('./App/Views/SetOneRepMax');
var Instructions = require('./App/Views/Instructions');
var Stats = require('./App/Views/Stats');
var Loading = require('./App/Views/Loading');
var DataStore = require('./App/Data/DataStore');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Component
} = React;

class BenchPro extends Component {
  constructor(props){
    this.loadWorkouts();
    this.state = {
      selectedTab: 'workouts',
      loaded: false
    }
  }
  loadWorkouts(){
    DataStore.getRoutine()
      .then((res) => this.handleResponseOrReroute(res))
      .done();
  }
  handleResponseOrReroute(res){
    if (res){
      this.setState({
        routine: res,
      });
    } else {
      this.changeTab('setOneRepMax');
    }
    this.setState({
      loaded: true
    });
  }
  changeTab(tabName) {
    this.setState({
      selectedTab: tabName
    });
  }
  createRoutineView() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Workout',
          component: Routine,
          passProps: {
            loaded: this.state.loaded
          }
        }}
      />
    );
  }
  render() {

    var loadingOrRoutineView = this.state.loaded ? this.createRoutineView() : <Loading />
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Workouts"
          icon={ require('image!routine') }
          onPress={ () => this.changeTab('workouts') }
          selected={ this.state.selectedTab === 'workouts' } >
          <View style={ styles.pageView }>
            {loadingOrRoutineView}
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Set Max"
          icon={ require('image!onerepmax') }
          onPress={() => this.changeTab('setOneRepMax')}
          selected={ this.state.selectedTab === 'setOneRepMax' }>
          <View style={ styles.pageView }>
            <SetOneRepMax />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Stats"
          icon={ require('image!stats') }
          onPress={() => this.changeTab('stats')}
          selected={ this.state.selectedTab === 'stats' }>
          <View style={ styles.pageView }>
            <Stats />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Instructions"
          icon={ require('image!instructions') }
          onPress={() => this.changeTab('instructions')}
          selected={ this.state.selectedTab === 'instructions' }>
          <View style={ styles.pageView }>
            <Instructions />
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageView: {
    backgroundColor: '#fff',
    flex: 1
  }
});

AppRegistry.registerComponent('BenchPro', () => BenchPro);
