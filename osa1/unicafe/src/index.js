import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor () {
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
        <Statistics review="hyvä" count={this.state.good}/>
        <Statistics review="neutraali" count={this.state.neutral}/>
        <Statistics review="huono" count={this.state.bad}/>
      </div>
    )
  }

}

const Statistics = ({ review, count }) => (
  <div>{review} {count}</div>
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