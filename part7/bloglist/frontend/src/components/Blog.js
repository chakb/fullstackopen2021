import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog, removeBlog, addComment, selectBlogById } from '../reducers/blogReducer'
import { selectUser } from '../reducers/loggedUserReducer'
import { notify } from '../reducers/notificationReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { blogId } = useParams()

  const blog = useSelector(state => selectBlogById(state, blogId))
  const user = useSelector(selectUser)

  const addLike = async () => {
    try {
      await dispatch(likeBlog(blog))
      dispatch(notify(`${blog.title} liked!`, 'success'))
    } catch (exception) {
      dispatch(notify(`${exception.response.data.error}`, 'error'))
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      try {
        await dispatch(removeBlog(blog.id))
        dispatch(notify(`${blog.title} deleted!`, 'success'))
        navigate('/')
      } catch (exception) {
        console.log('exception', exception)
        dispatch(notify(`${exception.response.data.error}`, 'error'))
      }
    }
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    if (event.target.comment.value) {
      try {
        await dispatch(addComment(blog, event.target.comment.value))
        event.target.comment.value = ''
      } catch (exception) {
        console.log('exception', exception)
        dispatch(notify(`${exception.response.data.error}`, 'error'))
      }
    }

  }

  if (!blog) {
    return null
  }

  return (
    <div className='blog'>
      <div>
        <h2>{blog.title} {blog.author}</h2>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button className='like-button' onClick={addLike}>like</button></div>
        <div>added by {blog.user.name}</div>
        {user.username === blog.user.username && <button onClick={deleteBlog}>remove</button>}

        <h3>comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input type='text' name='comment' />
          <button>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
        </ul>
      </div >
    </div>
  )
}

export default Blog