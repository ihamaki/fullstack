import anecdoteService from '../services/anecdotes'

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

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      content: newAnecdote.content,
      id: newAnecdote.id,
      votes: newAnecdote.votes
    })
  }
}

export const anecdoteVoting = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}

export default anecdoteReducer