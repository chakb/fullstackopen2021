const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((suma, blog) => suma + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? []
    : blogs.reduce((favorite, blog) => {
      return favorite.likes >= blog.likes
        ? favorite
        : blog
    }, blogs[0])
}

const mostBlogs = (blogs) => {
  const result = _(blogs)
    .countBy((blogs) => blogs.author)
    .entries()
    .maxBy(_.last)

  return result === undefined
    ? {}
    : { author: result[0], blogs: result[1] }
}

const mostLikes = (blogs) => {
  const result = _(blogs)
    .groupBy((blog) => blog.author)
    .mapValues(totalLikes)
    .entries()
    .maxBy(_.last)

  return result === undefined
    ? {}
    : { author: result[0], likes: result[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}