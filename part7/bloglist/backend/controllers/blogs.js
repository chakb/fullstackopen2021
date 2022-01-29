const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {

  if (!request.body.comment) {
    response.status(400).json({ error: 'no comment received' }).end()
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).end()
  }

  blog.comments.push(request.body.comment)
  await blog.save()
  response.status(200).json(blog)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blogToDelete = await Blog.findById(request.params.id)

  if (!blogToDelete) {
    response.status(404).end()
  }
  else if (blogToDelete.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter((b => b.toString() !== blogToDelete.id))
    await user.save()
    response.status(204).end()
  }
  else {
    response.status(403).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedblog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.status(200).json(updatedblog)
})

module.exports = blogsRouter