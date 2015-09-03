'use strict';

var Constants = {
  Global: {
    cancel: 'Cancel',
    failure: 'failure',
    invalidNumber: 'Please enter a valid number',
    lbs: 'lbs',
    negative: 'negative',
    pounds: 'pounds',
    reset: 'Reset',
    submit: 'Submit',
    update: 'Update'
  },

  OneRepMax: {
    maxSaved: 'One rep max saved!',
    sameMax: 'Your max is already set to',
    saveError: 'Failed to save one rep max',
    setOneRepMax: 'Set your one rep max',
    updateOneRepMax: 'Update your one rep max',
    workoutsInProgress: 'Looks like you already have a 1RM set and you have made some solid progress.  Would you like to start over with your new 1RM, or would you like to update your current routine with your new 1RM?'
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
