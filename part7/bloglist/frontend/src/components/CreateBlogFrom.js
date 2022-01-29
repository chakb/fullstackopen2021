import { useState } from 'react'
import PropTypes from 'prop-types'

import { TextField, Button } from '@mui/material'

const CreateBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const savedBlog = await createBlog(blogObject)
    if (savedBlog) {
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    }
  }

  return (
    < form onSubmit={addBlog} >
      <div>
        <TextField
          label='title'
          margin='dense'
          size='small'
          id='title'
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        <TextField
          label='author'
          margin='dense'
          size='small'
          id='author'
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        <TextField
          label='url'
          margin='dense'
          size='small'
          id='url'
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <Button id='submit-button' type="submit"  variant='contained'>create</Button>
    </form >
  )
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlogForm