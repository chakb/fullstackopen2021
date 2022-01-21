import anecdoteService from '../services/anecdotes'

const sortByVotes = (anecdotes) => [...anecdotes].sort((a, b) => b.votes - a.votes)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const votedState = state.map((anecdote) =>
        anecdote.id === action.data.id
          ? action.data
          : anecdote
      )
      const orderedState = sortByVotes(votedState)
      return orderedState
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return sortByVotes(action.data)
    default:
      return state
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(
      anecdote.id,
      { ...anecdote, votes: anecdote.votes + 1 }
    )
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default anecdoteReducer