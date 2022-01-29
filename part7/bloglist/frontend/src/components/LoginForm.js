import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loggedUserReducer'

import { TextField, Button } from '@mui/material'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label='username'
          margin='dense'
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          label='password'
          margin='dense'
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <Button id="login-button" type="submit" variant='contained' color='primary'>login</Button>
    </form>
  )
}

export default LoginForm