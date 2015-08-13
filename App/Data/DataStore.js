'use strict';

var Storage = require('../Utils/storage');
var Promise = require('bluebird');

var DataStore = {

  setRoutine(routine){
    this.routine = routine;
  },
  getRoutine(){
    return Promise.try(() => {
      if (this.routine) {
        return this.routine;
      } else {
        return Storage.getRoutine();
      }
    });
  },
  updateWorkout(workout){
    this.getRoutine()
      .then((routine) => {
        routine.workouts[workout.id] = workout;
        this.setRoutine(routine);
        Storage.updateRoutine(routine);
      });
  }

};

module.exports = DataStore;
