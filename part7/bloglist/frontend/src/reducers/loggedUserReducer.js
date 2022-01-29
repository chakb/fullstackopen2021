import blogService from '../services/blogs'
import loginService from '../services/login'
import { notify } from './notificationReducer'


const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_LOGGED_USER':
      return action.payload
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const initLoggedUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_LOGGED_USER',
        payload: user
      })
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type:'LOGIN',
        payload: user
      })
    } catch (exception) {
      dispatch(notify('Wrong credentials', 'error'))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBloglistappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const selectUser = state => state.user

export default loggedUserReducer