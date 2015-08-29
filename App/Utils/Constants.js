'use strict';

var Constants = {
  Global: {
    failure: 'failure',
    invalidNumber: 'Please enter a valid number',
    negative: 'negative',
    submit: 'Submit'
  },

  Routine: {
    completeStatus: 'Complete',
    completeStatusButton: 'View details',
    incompleteStatus: 'In progress',
    incompleteStatusButton: 'Continue',
    newStatus: 'New',
    newStatusButton: 'Begin',
    workoutsComplete: 'congratulations, you\'ve finished all the workouts'
  },

  Stats: {
    bestMax: 'Best One Rep Max',
    currentMax: 'Current One Rep Max',
    initialMax: 'Initial One Rep Max'
  },

  Workout: {
    confirm: 'Yes',
    deny: 'No',
    decrease1RM: 'It seems that was too difficult.  For better results, would you like to decrease your routine\'s 1RM by 5lbs?',
    increase1RM: 'Whoa that was way too easy.  Would you like to increase your routine\'s 1RM by 5lbs?',
    howManyReps: 'How many reps did you complete?',
    workoutComplete: 'Workout complete!  See you in a few days!'
  }
};

module.exports = Constants;
