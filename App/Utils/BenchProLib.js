'use strict';

var React = require('react-native');

var {
  View
} = React;

var BenchProLib = {

  createEmptyView() {
    return <View></View>;
  },

  findGreatestValue(array) {
    return array.reduce((max, item) => {
      return item > max ? item : max;
    }, 0);
  }

}

module.exports = BenchProLib;
