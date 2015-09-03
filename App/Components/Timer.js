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

    var duration = Number(props.duration);
    this.state = {
      remaining: duration,
      run: true
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.run) {
      this.setState({
        remaining: Number(newProps.duration),
        run: false
      }, this.resetAndStartTimer());
    }
  }

  startTimer() {
    this.setState({
      run: true
    }, this.runTimer.bind(this, this.props.id));
  }

  stopTimer() {
    this.setState({
      run: false
    });
  }

  runTimer(id) {
    if (this.state.run) {
      setTimeout(this.decrementAndRun.bind(this, id), 1000);
    }
  }

  decrementAndRun(id) {
    if (this.isCurrentTimer(id) && this.timeLeft()){
      this.setState({
        remaining: this.state.remaining - 1
      }, this.runTimer.bind(this, id))
    }
  }

  resetTimer() {
    this.setState({
      remaining: Number(this.props.duration)
    });
  }

  resetAndStartTimer() {
    this.setState({
      run: true
    }, this.startTimer);

  }

  isCurrentTimer(id) {
    return id === this.props.id;
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

    var timerStatus = this.timeLeft() ? this.showTimeRemaining() : this.showTimerComplete();

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
