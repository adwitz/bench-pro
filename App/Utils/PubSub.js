'use strict';

var events = {};

var PubSub = {

  publish(event) {
    if (events[event]) {
      events[event].forEach(function(callback){
        callback();
      });
    }
  },

  subscribe(event, callback) {
    if (events[event]) {
      events[event].push(callback);
    } else {
      events[event] = [callback];
    }
  }

};

module.exports = PubSub;
