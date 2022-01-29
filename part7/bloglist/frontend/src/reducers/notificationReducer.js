const initialState = { message: '', severity: 'error' }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.message, severity: action.severity }
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

let timeoutId

export const notify = (message, severity) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      severity
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
      timeoutId = 0
    }, 5000)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export const notificationSelector = state => state.notification


export default notificationReducer