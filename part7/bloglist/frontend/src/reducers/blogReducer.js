import blogService from '../services/blogs'

const sortByLikes = (blogList) => [...blogList].sort((a, b) => b.likes - a.likes)

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return sortByLikes(action.payload)
    case 'NEW_BLOG':
      return state.concat(action.payload)
    case 'REMOVE_BLOG':
      return state.filter((b) => b.id !== action.payload)
    case 'LIKE_BLOG':
      return sortByLikes(state.map(blog =>
        blog.id === action.payload.id
          ? action.payload
          : blog))
    case 'ADD_COMMENT':
      return state.map(blog =>
        blog.id === action.payload.id
          ? action.payload
          : blog
      )
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs,
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const savedBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      payload: savedBlog
    })
  }
}

export const removeBlog = (blogId) => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch({
      type: 'REMOVE_BLOG',
      payload: blogId
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.update(blog.id, { ...blog, likes: blog.likes + 1, user: blog.user.id })
    dispatch({
      type: 'LIKE_BLOG',
      payload: { ...blog, likes: blog.likes + 1 }
    })
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    await blogService.addComment(blog.id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      payload: { ...blog, comments: blog.comments.concat(comment) }
    })
  }
}

export const selectBlogs = state => state.blogs

export const selectBlogById = (state, blogId) => state.blogs.find(blog => blog.id === blogId)

export default blogReducer