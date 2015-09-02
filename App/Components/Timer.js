'use strict';

var React = require('react-native');

var {
  Component,
  Text,
  View,
  StyleSheet
} = React;

class Timer extends Component {
  constructor(props) {
    super(props)

    var seconds = Number(props.duration);

    this.state = {
      remaining: props.duration,
      run: true
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.run) {
      this.setState({
        remaining: newProps.duration,
        run: true
      }, this.startTimer);
    }
  }

  startTimer() {
    this.setState({
      run: true
    }, this.runTimer);
  }

  stopTimer() {
    this.setState({
      run: false
    });
  }

  runTimer() {
    if (this.state.run && this.props.run && this.timeLeft()) {
      setTimeout(this.decrementAndRun.bind(this), 1000);
    }
  }

  decrementTime() {
    if (this.state.remaining >= 1){
      this.setState({
        remaining: this.state.remaining - 1
      });
    }

  }

  decrementAndRun() {
    this.decrementTime();
    this.runTimer();
  }

  resetTimer() {
    this.setState({
      remaining: Number(this.props.duration)
    });
  }


  timeLeft() {
    return this.state.remaining >= 1;
  }

  showTimeRemaining() {
    return <Text>Begin in: {this.state.remaining}</Text>
  }

  showTimerComplete() {
    return <Text>Get Started!</Text>
  }

  render() {

    var timerStatus = this.timeLeft(true) ? this.showTimeRemaining() : this.showTimerComplete();

    return (
      <View style={styles.container}>
        {timerStatus}
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center'
  }
});

module.exports = Timer;
