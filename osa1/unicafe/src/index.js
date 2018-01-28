import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
  }

  handlePositive = () => {
    this.setState({
      good: this.state.good + 1
    })
  }

  handleNeutral = () => {
    this.setState({
      neutral: this.state.neutral + 1
    })
  }

  handleNegative = () => {
    this.setState({
      bad: this.state.bad + 1
    })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <Button
          handleClick={this.handlePositive}
          text="hyvä"
        />
        <Button
          handleClick={this.handleNeutral}
          text="neutraali"
        />
        <Button
          handleClick={this.handleNegative}
          text="huono"
        />
        <h2>statistiikka</h2>
        <Statistics reviews={this.state} />
      </div>
    )
  }

}

const Statistics = ({ reviews }) => {
  const all = reviews.good + reviews.neutral + reviews.bad
  const mean = () => {
    if (all === 0) { return 0 }
    return round((reviews.good - reviews.bad) / all, 1)
  }
  const positives = () => {
    if (all === 0) { return 0 }
    return round(reviews.good / all * 100, 1)
  }
  const round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

  return (
    <div>
      <div>hyvä {reviews.good}</div>
      <div>neutraali {reviews.neutral}</div>
      <div>huono {reviews.bad}</div>
      <div>keskiarvo {mean()}</div>
      <div>positiivisia {positives()} %</div>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)