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
    return asyncStorage.getOneRepMax();
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
  setRegimenForOneRepMax(weight){
    benchData.getRegimen(weight)
      .then((regimen) => {
        var lastCompletedWorkoutIndex = this.getLastCompletedWorkoutIndex();
        if (lastCompletedWorkoutIndex){
          var completedWorkouts = this.getCompletedWorkouts(lastCompletedWorkoutIndex);
          regimen = completedWorkouts.concat(regimen.slice(lastCompletedWorkoutIndex + 1));
        }
        asyncStorage.setRegimen(regimen)
          .then(() => {
            console.log('successfully set regimen');
          }).done();
      }).done();
  },
  logLastWorkout(workout){
    var history = asyncStorage.getWorkoutLog()
      .then((data) => {
        data = JSON.parse(data);
        data[workout.id] = workout;
        this.updateWorkoutLog(data);
        this.setLastCompletedWorkoutIndex(workout.id);
      }).done();
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
    var regimen = asyncStorage.getWorkoutLog()
      .then((data) => {
        data = JSON.parse(data);
        return data.slice(0, index);
      }).done();
      return regimen;
  }

};

module.exports = storage;