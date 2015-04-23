'use strict';

var React = require('react-native');

var {
  AsyncStorage
} = React;

var storage = {
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
  }
  updateWorkoutLog(history){
    return AsyncStorage.setItem('workoutLog', JSON.stringify(history));
  },
  getWorkoutLog(){
    return AysncStorage.getItem('workoutLog');
  },
  setLastCompletedWorkoutIndex(workoutNumber){
    return AsyncStorage.setItem('lastCompleted', JSON.stringify(workoutNumber));
  },
  getLastCompletedWorkoutIndex(){
    return AsyncStorage.getItem('lastCompleted');
  }

};

module.exports = asyncStorage;