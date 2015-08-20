'use strict';

var Storage = require('../Utils/storage');
var BenchData = require('../Utils/benchData');
var Promise = require('bluebird');

var DataStore = {

  getRoutine(){
    return Promise.try(() => {
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

  changeOneRepMax(weight, refreshWorkoutView){

    var getUpdatedWorkouts = (current, next, lastCompleted) => {
      return current.slice(0, lastCompleted + 1).concat(next.slice(lastCompleted + 1));
    };

    Promise.try(() => {

      return this.getOneRepMax();

    }).then((oneRepMax) => {

      var newOneRepMax = oneRepMax + weight;
      this.setOneRepMax(newOneRepMax);
      return Promise.join(this.getRoutine(), BenchData.getWorkouts(newOneRepMax), this.getOneRepMax());

    }).then((response) => {

      var [routine, newWorkouts, oneRepMax] = response;
      var lastCompletedWorkout = this.getLastCompletedWorkout();
      var updatedWorkouts = getUpdatedWorkouts(routine.workouts, newWorkouts, oneRepMax);

      routine.max = oneRepMax;
      routine.workouts = updatedWorkouts;

      return this.setRoutine(routine);
    }).then(() => {
      refreshWorkoutView();
    }).catch((err) => {
      console.log('error retrieving message: ', err);
      return {success: false, message: err};
    }).finally(() => {
      return {success: true};
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
