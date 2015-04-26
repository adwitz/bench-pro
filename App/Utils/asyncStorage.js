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
  setRoutine(routine){
    return AsyncStorage.setItem('routine', JSON.stringify(routine));
  },
  getWorkoutLog(){
    return AysncStorage.getItem('routine');
  },
  setLastCompletedWorkoutIndex(workoutNumber){
    return AsyncStorage.setItem('lastCompleted', JSON.stringify(workoutNumber));
  },
  getLastCompletedWorkoutIndex(){
    return AsyncStorage.getItem('lastCompleted');
  }

};

module.exports = asyncStorage;