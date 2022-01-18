import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogFrom'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState({ text: null, className: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortByLikes(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortByLikes = (blogList) => [...blogList].sort((a, b) => b.likes - a.likes)

  const notifyWith = (text, className) => {
    setNotificationMessage({ text, className })
    setTimeout(() => {
      setNotificationMessage({ ...notificationMessage, text: null })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('Wrong credentials', 'error')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBloglistappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      let savedBlog = await blogService.create(blogObject)
      createBlogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(savedBlog))
      notifyWith(`a new blog ${savedBlog.title} added`, 'success')
      savedBlog.user = {
        id: savedBlog.user,
        name: user.name,
        username: user.username
      }
      return savedBlog
    } catch (exception) {
      notifyWith(`${exception.response.data.error}`, 'error')
    }
  }

  const updateBlog = async (blogObject) => {
    //it works passing only likes property,
    // but semantically PUT expects the whole resource,
    // PATCH is for partial updates instead
    const blogToUpdate = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes,
      user: blogObject.user.id
    }
    try {
      await blogService.update(blogObject.id, blogToUpdate)
      const updatedBlogs = blogs.map((blog) =>
        blog.id === blogObject.id
          ? blogObject
          : blog
      )
      setBlogs(sortByLikes(updatedBlogs))
      notifyWith(`${blogObject.title} liked!`, 'success')
    } catch (exception) {
      notifyWith(`${exception.response.data.error}`, 'error')
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      notifyWith(`${blog.title} deleted!`, 'success')
    } catch (exception) {
      console.log('exception', exception)
      notifyWith(`${exception.response.data.error}`, 'error')
    }
  }

  const createBlogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        <Notification message={notificationMessage} />
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <p>{user.name} is logged in<button onClick={handleLogOut}>logout</button></p>
      <Togglable buttonLabel='create' ref={createBlogFormRef}>
        <h2>create new</h2>
        <CreateBlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} update={updateBlog} remove={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default App