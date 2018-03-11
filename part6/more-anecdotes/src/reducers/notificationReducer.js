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

export const notifyWith = (text, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: text
    })
    setTimeout(() => {
      dispatch({ type: 'REMOVE' })
    }, time*1000)
  }
}

export default notificationReducer