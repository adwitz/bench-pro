'use strict';

var React = require('react-native');

var {
  AsyncStorage
} = React;

var storage = {
  setOneRepMax(weight){
    AsyncStorage.setItem('oneRepMax', weight.trim())
  },
  addToOneRepMaxHistory(weight){
    this.getOneRepMaxHistory()
      .then((arr) => {
        var weights = JSON.parse(arr);
        weights.push(weight);
        AsyncStorage.setItem('oneRepMaxHistory', JSON.stringify(weights));
      }).done();
  },
  getOneRepMaxHistory(){
    AsyncStorage.getItem('oneRepMaxHistory')
      // .then((value) => value))
      // .done();
  },

};

module.exports = storage;