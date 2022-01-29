import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, Link } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogFrom'
import Togglable from './components/Togglable'
import UsersView from './components/UsersView'
import User from './components/User'
import Menu from './components/Menu'

import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, selectBlogs } from './reducers/blogReducer'
import { initLoggedUser, logout, selectUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/usersReducer'

import {
  Container, Typography, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(selectBlogs)
  const user = useSelector(selectUser)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initLoggedUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [blogs])

  const handleLogOut = () => {
    dispatch(logout())
  }

  const addBlog = async (blogObject) => {
    try {
      await dispatch(createBlog(blogObject))
      createBlogFormRef.current.toggleVisibility()
      dispatch(notify(`a new blog ${blogObject.title} added`, 'success'))
      return blogObject
    } catch (exception) {
      dispatch(notify(`${exception.response.data.error}`, 'error'))
    }
  }

  const createBlogFormRef = useRef()

  if (user === null) {
    return (
      <Container>
        <div>
          <Typography variant='h2' component='h2'>
            Login to application
          </Typography>
          <Notification />
          <LoginForm />
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Menu name={user.name} handleLogOut={handleLogOut} />
      <Typography variant='h1' component='h1'>blog app</Typography>
      <Notification />
      <Routes>
        <Route path='/users' element={<UsersView />} />
        <Route path='/users/:userId' element={<User />} />
        <Route path='/blogs/:blogId' element={< Blog />} />
        <Route path='/' element={
          <>
            <Togglable buttonLabel='create' ref={createBlogFormRef}>
              <Typography variant='h4' component='h2'>create new</Typography>
              <CreateBlogForm
                createBlog={addBlog} />
            </Togglable>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {blogs.map(blog =>
                    <TableRow key={blog.id}>
                      <TableCell component={Link} to={`blogs/${blog.id}`}>
                        <Typography>{blog.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{blog.author}</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        } >
        </Route>
      </Routes>
    </Container>
  )
}

export default App