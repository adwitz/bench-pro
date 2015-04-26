'use strict';

var React = require('react-native');

var {
  AsyncStorage
} = React;

var asyncStorage = {
  getOneRepMax(){
    return AsyncStorage.getItem('oneRepMax');
  },
  setOneRepMax(weight){
    return AsyncStorage.setItem('oneRepMax', JSON.stringify(weight));
  },
  getOneRepMaxHistory(){
    return AsyncStorage.getItem('oneRepMaxHistory');
  },
  setOneRepMaxHistory(history){
    return AsyncStorage.setItem('oneRepMaxHistory', JSON.stringify(history));
  },
  setRegimen(regimen){
    return AsyncStorage.setItem('regimen', JSON.stringify(regimen));
  },
  getWorkoutLog(){
    return AysncStorage.getItem('regimen');
  },
  setLastCompletedWorkoutIndex(workoutNumber){
    return AsyncStorage.setItem('lastCompleted', JSON.stringify(workoutNumber));
  },
  getLastCompletedWorkoutIndex(){
    return AsyncStorage.getItem('lastCompleted');
  }

};

module.exports = asyncStorage;