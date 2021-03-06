'use strict';

var React = require('react-native');
var Home = require('./App/Views/Home');
var Routine = require('./App/Views/Routine');
var SetOneRepMax = require('./App/Views/SetOneRepMax');
var Settings = require('./App/Views/Settings');
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
      console.log('changing state in index.ios')
      this.setState({
        routine: res,
        loaded: true
      });
    } else {
      this.changeTab('setOneRepMax');
    }
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
          icon={ require('image!facemash') }
          onPress={ () => this.changeTab('workouts') }
          selected={ this.state.selectedTab === 'workouts' } >
          <View style={ styles.pageView }>
            {loadingOrRoutineView}
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Set Max"
          icon={ require('image!messages') }
          onPress={() => this.changeTab('setOneRepMax')}
          selected={ this.state.selectedTab === 'setOneRepMax' }>
          <View style={ styles.pageView }>
            <SetOneRepMax />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Settings"
          icon={ require('image!settings') }
          onPress={() => this.changeTab('settings')}
          selected={ this.state.selectedTab === 'settings' }>
          <View style={ styles.pageView }>
            <Settings />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Stats"
          icon={ require('image!settings') }
          onPress={() => this.changeTab('stats')}
          selected={ this.state.selectedTab === 'stats' }>
          <View style={ styles.pageView }>
            <Stats />
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
