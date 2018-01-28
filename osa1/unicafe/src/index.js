import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
      all: 0
    }
  }

  handlePositive = () => {
    this.setState({
      good: this.state.good + 1,
      all: this.state.all + 1
    })
  }

  handleNeutral = () => {
    this.setState({
      neutral: this.state.neutral + 1,
      all: this.state.all + 1
    })
  }

  handleNegative = () => {
    this.setState({
      bad: this.state.bad + 1,
      all: this.state.all + 1
    })
  }

  countMean = () => {
    if (this.state.all > 0) {
      return (this.state.good - this.state.bad) / this.state.all
    }
    return 0
  }

  countPositives = () => {
    if (this.state.all > 0) {
      return this.state.good / this.state.all * 100
    }
    return 0
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <Button handleClick={this.handlePositive} text="hyvä" />
        <Button handleClick={this.handleNeutral} text="neutraali" />
        <Button handleClick={this.handleNegative} text="huono" />
        <h2>statistiikka</h2>
        <Statistics state={this.state} mean={this.countMean()} positives={this.countPositives()} />
      </div>
    )
  }

}

const Statistics = ({ state, mean, positives }) => {
  const round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }
  mean = round(mean, 1)
  positives = round(positives, 1) + "%"
  return (
    <div>
      <Statistic text={"hyvä"} value={state.good} />
      <Statistic text={"neutraali"} value={state.neutral} />
      <Statistic text={"huono"} value={state.bad} />
      <Statistic text={"keskiarvo"} value={mean} />
      <Statistic text={"positiivisia"} value={positives} />
    </div>
  )
}

const Statistic = ({ text, value }) => (
  <div>{text} {value}</div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)