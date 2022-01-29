import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from '../reducers/usersReducer'

import { Typography, List, ListItemText, ListItem } from '@mui/material'

const User = () => {

  const { userId } = useParams()

  const user = useSelector(state => selectUserById(state, userId))

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant='h3' component='h2'>{user.name}</Typography>
      <Typography variant='h4' component='h3'>added blogs</Typography>
      <List>
        {user.blogs.map(blog => {
          return (
            <ListItem key={blog.id}>
              <ListItemText primary={blog.title} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )

}

export default User