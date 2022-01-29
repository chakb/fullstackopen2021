import userService from '../services/users.js'

const initialState = []

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INIT_USERS':
      return payload
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      payload: users,
    })
  }
}

export const selectUsers = state => state.users

export const selectUserById = (state, userId) => state.users.find( user => user.id ===userId)

export default usersReducer