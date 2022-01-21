const initialState = { message: '', timeoutId: 0 }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return action.payload
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const notify = (message, timeout) => {
  return dispatch => {

    const timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        message,
        timeoutId
      }
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export default notificationReducer