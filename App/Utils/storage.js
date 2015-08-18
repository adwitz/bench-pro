'use strict';

var React = require('react-native');
var asyncStorage = require('./asyncStorage');
var benchData = require('./benchData');

var storage = {
  setOneRepMax(weight){
    weight = weight.trim();
    this.addToOneRepMaxHistory(weight);
    return asyncStorage.setOneRepMax(weight);
  },
  getOneRepMax(){
    return asyncStorage.getOneRepMax()
      .then((weight) => {
        weight = JSON.parse(weight);
        return Number(weight);
      });
  },
  addToOneRepMaxHistory(weight){
    weight = Number(weight);
    asyncStorage.getOneRepMaxHistory()
      .then((arr) => {
        var history = JSON.parse(arr);
        if (history){
          history.push(weight);
        } else {
          history = [weight];
        }
        asyncStorage.setOneRepMaxHistory(history);
      })
      .done();
  },
  setRoutineForOneRepMax(weight){
    benchData.getRoutine(weight)
      .then((routine) => asyncStorage.setRoutine(routine))
      .then(() => {
        console.log('successfully set routine');
      })
      .done();
  },
  updateRoutine(routine){
    asyncStorage.setRoutine(routine)
      .then((data) => {
        console.log('successfully updated workouts: ', data);
      })
      .done();
  },
  getRoutine(){
    return asyncStorage.getWorkoutRoutine()
      .then((data) => {
        if (data){
          return JSON.parse(data);
        } else {
          return null;
        }
      });
  },
  logLastWorkout(workout){
    var history = asyncStorage.getWorkoutRoutine()
      .then((data) => {
        data = JSON.parse(data);
        data[workout.id] = workout;
        this.updateWorkoutLog(data);
        this.setLastCompletedWorkoutIndex(workout.id);
      })
      .done();
  },
  getLastCompletedWorkoutIndex(){
    var lastCompletedWorkoutIndex = asyncStorage.getLastCompletedWorkoutIndex()
      .then((data) => {
        if (data){
          return data.json();
        }
      })
      .done();
    return lastCompletedWorkoutIndex;
  },
  getCompletedWorkouts(index){
    var routine = asyncStorage.getWorkoutRoutine()
      .then((data) => {
        data = JSON.parse(data);
        return data.slice(0, index);
      })
      .done();
      return routine;
  }

};

module.exports = storage;
