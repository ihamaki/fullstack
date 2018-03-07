import React from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        {this.props.store.getState().notification ?
          <Notification store={this.props.store} /> :
          ''
        }
        <Filter store={this.props.store} />
        <AnecdoteList store={this.props.store} />
        <AnecdoteForm store={this.props.store} />
      </div>
    )
  }
}

export default App