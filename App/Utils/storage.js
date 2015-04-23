'use strict';

var React = require('react-native');
var asyncStorage = require('./asyncStorage');

var data = {
  setOneRepMax(weight){
    weight = weight.trim();
    this.addToOneRepMaxHistory(weight);
    return asyncStorage.setOneRepMax(JSON.stringify(weight)));
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
        asyncStorage.setOneRepMaxHistory(weights);
      })
      .done();
  }
  logLastWorkout(workout){
    var history = this.getWorkoutLog()
      .then((data) => {
        data = JSON.parse(data);
        data[workout.id] = workout;
        this.updateWorkoutLog(data);
        this.setLastCompletedWorkoutIndex(workout.id);
      }).done();
  }

};

module.exports = storage;