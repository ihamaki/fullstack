import React from 'react'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notificationVote, notificationRemove } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleClick = async (anecdote) => {
    await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    this.props.anecdoteVoting(anecdote.id)
    this.props.notificationVote(anecdote.content)
    setTimeout(() => {
      this.props.notificationRemove()
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(a => a.content.trim().toLowerCase().match(filter))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { anecdoteVoting, notificationVote, notificationRemove }
)(AnecdoteList)

export default ConnectedAnecdoteList
