import React from 'react'
import reducer from './reducer'

class App extends React.Component {
  addVote = (id) => () => {
    this.props.store.dispatch({
      type: 'ADD',
      data: id
    })
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
        <form>
          <div><input /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App