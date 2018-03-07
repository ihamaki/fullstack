import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notificationVote, notificationRemove } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleClick = (anecdote) => {
    this.props.store.dispatch(anecdoteVoting(anecdote.id))
    this.props.store.dispatch(notificationVote(anecdote.content))
    setTimeout(() => {
      this.props.store.dispatch(notificationRemove())
    }, 5000)
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleClick(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
