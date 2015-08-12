'use strict';

var Storage = require('../Utils/storage');

var DataStore = {

  setRoutine(routine){
    this.routine = routine;
  },
  getRoutine(){
    return this.routine;
  },
  updateWorkout(workout){
    var routine = this.getRoutine();
    routine.workouts[workout.id] = workout;
    this.setRoutine(routine);
    Storage.updateRoutine(routine);
  }

};

module.exports = DataStore;
