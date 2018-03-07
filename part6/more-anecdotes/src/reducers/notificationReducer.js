const initialNotification = ''

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

export const notificationAddNew = (anecdote) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: 'anecdote \'' + anecdote + '\' was added' 
  }
}

export const notificationVote = (anecdote) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: 'you voted \'' + anecdote + '\''
  }
}

export const notificationRemove = () => {
  return { type: 'REMOVE' }
}

export default notificationReducer