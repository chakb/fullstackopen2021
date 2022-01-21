import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state =>
    state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  )

  const addVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(notify(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList