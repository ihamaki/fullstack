import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const reviews = store.getState()
  const all = reviews.good + reviews.ok + reviews.bad

  if (all === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  const mean = (reviews.good - reviews.bad) / all
  const positives = (reviews.good / all) * 100

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{reviews.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{reviews.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{reviews.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{mean}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positives} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (button) => () => {
    store.dispatch({ type: button })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)