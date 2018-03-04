import React from 'react'
import reducer from './reducer'

class App extends React.Component {
  addVote = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: id
    })
  }

  newAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW',
      data: anecdote
    })
    event.target.anecdote.value =''
  }

  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort((first, second) => second.votes - first.votes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button
                onClick={this.addVote(anecdote.id)}>vote
              </button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.newAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App