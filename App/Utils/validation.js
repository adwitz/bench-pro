'use strict';

var validation = {
  weightIsDivisbleByFive(weight) {
    return weight % 5 === 0 ? true : false;
  },
  weightIsWithinRange(weight) {
    return this.weightIsGreaterThanMin(weight) && this.weightIsLessThanMax(weight);
  },
  weightIsGreaterThanMin(weight) {
    return weight >= 100 ? true : false;
  },
  weightIsLessThanMax(weight) {
    return weight <= 550 ? true : false;
  },
  weightIsValid(weight) {
    weight = Number(weight.trim());
    if (this.weightIsDivisbleByFive(weight) && this.weightIsWithinRange(weight)) {
      return true;
    }
    return false;
  },
  getErrorMessage(weight) {
    weight = Number(weight.trim());
    var messages = [];
    if (!this.weightIsGreaterThanMin(weight)) {
      messages.push('greater than 100lbs');
    }
    if (!this.weightIsLessThanMax(weight)) {
      messages.push('less than 550lbs');
    }
    if (!this.weightIsDivisbleByFive(weight)) {
      messages.push('divisible by 5');
    }
    return this.buildErrorString(messages);
  },
  buildErrorString(messages) {
    var message = 'Weight must be';
    if (messages.length > 1) {
      message = `${message} ${messages[0]} and ${messages[1]}.`;
    } else {
      message = `${message} ${messages[0]}.`;
    }
    return message;
  },
  isValidNumber(number){
    var reg = /^\d+$/;
    return reg.test(number);
  }
};

module.exports = validation;
