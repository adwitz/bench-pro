'use strict';

var React = require('react-native');
var asyncStorage = require('./asyncStorage');
var benchData = require('./benchData');
var PubSub = require('./PubSub');

var storage = {

  setOneRepMax(weight){
    this.addToOneRepMaxHistory(weight);
    return asyncStorage.setOneRepMax(weight);
  },

  getOneRepMax(){
    return asyncStorage.getOneRepMax()
      .then((weight) => {
        weight = JSON.parse(weight);
        if (weight) {
          return Number(weight);
        }
        return null;
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

  getOneRepMaxHistory() {
    return asyncStorage.getOneRepMaxHistory()
      .then((res) => {
        if (res) {
          return JSON.parse(res);
        }
      });
  },

  setRoutineForOneRepMax(weight){
    return benchData.getRoutine(weight)
      .then((routine) => asyncStorage.setRoutine(routine))
      .then(() => {
        PubSub.publish('loadWorkouts');
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

  clearRoutine() {
    return asyncStorage.clearRoutine();
  },

  logLastWorkout(workout){
    asyncStorage.getWorkoutRoutine()
      .then((data) => {
        data = JSON.parse(data);
        data[workout.id] = workout;
        this.updateWorkoutLog(data);
        this.setLastCompletedWorkoutIndex(workout.id);
      })
      .done();
  },

  getLastCompletedWorkoutIndex(){
    return asyncStorage.getLastCompletedWorkoutIndex()
      .then((data) => {
        if (data){
          return JSON.parse(data);
        } else {
          return null;
        }
      });
  },

  setLastCompletedWorkoutIndex(index) {
    asyncStorage.setLastCompletedWorkoutIndex(index);
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
