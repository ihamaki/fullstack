const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const old = store.filter(a => a.id !== action.id)
      const voted = store.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    case 'CREATE':
      return [...store, { content: action.content, id: action.id, votes: action.votes }]
    default:
      return store
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export const anecdoteCreation = (anecdote) => {

  return {
    type: 'CREATE',
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes
  }
}

export const anecdoteVoting = (anecdoteId) => {
  return {
    type: 'VOTE',
    id: anecdoteId
  }
}

export default anecdoteReducer