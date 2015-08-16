'use strict';

var benchData = {

  santizeWeight(weight){
    if (typeof weight === 'number') {
      weight = String(weight);
    }
    return weight.trim();
  },

  getRoutine(weight){

    if (!weight) {
      return null;
    }

    weight = this.santizeWeight(weight);

    var url = `http://localhost:3000/routine/${weight}`;
    return fetch(url).then((res) => res.json());
  },

  getWorkouts(weight){
    return this.getRoutine(weight)
      .then((res) => {
        return res.workouts
      });
    // console.log('called get workouts in benchdata');
    // if (!weight) {
    //   return null;
    // }

    // weight = this.santizeWeight(weight);

    // var url = `http://localhost:3000/workouts/${weight}`;
    // return fetch(url).then((res) => {
    //   console.log('response: ', res.json());
    //   return res.json();
    //   // res.json()
    // })
    // .catch((err) => {
    //   console.warn(err);
    // });
  }
};

module.exports = benchData;
