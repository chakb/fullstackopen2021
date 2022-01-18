import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, update, remove, user }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    update({ ...blog, likes: blog.likes + 1 })
  }

  const deleteBlog = () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      remove(blog)
    }

  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button className='view-button' onClick={() => setBlogInfoVisible(!blogInfoVisible)}>
          {blogInfoVisible ? 'hide' : 'view'}
        </button>
        {blogInfoVisible &&
          <>
            <div>{blog.url}</div>
            <div>likes {blog.likes} <button className='like-button' onClick={addLike}>like</button></div>
            <div>{blog.user.name}</div>
            {user.username === blog.user.username && <button onClick={deleteBlog}>remove</button>}
          </>
        }
      </div >
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog