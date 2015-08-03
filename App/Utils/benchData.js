'use strict';

var benchData = {
  getRoutine(weight){
    if (weight) {
      weight = weight.trim();
      var url = `http://localhost:3000/workouts/${weight}`;
      return fetch(url).then((res) => res.json());
    } else {
      return null;
    }


  }
};

module.exports = benchData;
