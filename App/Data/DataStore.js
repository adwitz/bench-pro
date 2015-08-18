'use strict';

var Storage = require('../Utils/storage');
var BenchData = require('../Utils/benchData');
var Promise = require('bluebird');

var DataStore = {

  getRoutine(){
    return Promise.try(() => {
      console.log('calling get routine');
      if (this.routine) {
        return this.routine;
      } else {
        return Storage.getRoutine();
      }
    });
  },

  setRoutine(routine){
    this.routine = routine;
    return Storage.updateRoutine(routine);
  },

  getWorkouts(){
    return this.getRoutine()
      .then((routine) => {
        return routine.workouts;
      });
  },

  getOneRepMax(){
    return Promise.try(() => {
      if (this.oneRepMax) {
        return this.oneRepMax;
      } else {
        return Storage.getOneRepMax();
      }
    });
  },

  setOneRepMax(weight){
    this.oneRepMax = Number(weight);
  },

  changeOneRepMax(weight, refresh){
    Promise.try(() => {
      return this.getOneRepMax();
    }).then((oneRepMax) => {
      var newOneRepMax = oneRepMax + weight;
      this.setOneRepMax(newOneRepMax);
      return Promise.join(BenchData.getWorkouts(newOneRepMax), this.getRoutine(), this.getOneRepMax());
    }).then((response) => {
      var newWorkouts = response[0];
      var routine = response[1];
      var oneRepMax = response[2];
      var lastCompletedWorkout = this.getLastCompletedWorkout();
      var updatedWorkouts = routine.workouts.slice(0, lastCompletedWorkout + 1).concat(newWorkouts.slice(lastCompletedWorkout + 1));
      routine.max = oneRepMax;
      routine.workouts = updatedWorkouts;
      return this.setRoutine(routine);
    }).then(() => {
      refresh();
    }).catch((err) => {
      console.log('error retrieving message: ', err);
    });
  },

  updateWorkout(workout){
    this.getRoutine()
      .then((routine) => {
        routine.workouts[workout.id] = workout;
        this.setRoutine(routine);
        Storage.updateRoutine(routine);
      });
    this.setLastCompletedWorkout(workout);
  },

  getLastCompletedWorkout(){
    return this.lastCompletedWorkout;
  },

  setLastCompletedWorkout(workout){
    if (workout.completed) {
      this.lastCompletedWorkout = workout.id;
    } else {
      this.lastCompletedWorkout = workout.id - 1;
    }
  }

};

module.exports = DataStore;
