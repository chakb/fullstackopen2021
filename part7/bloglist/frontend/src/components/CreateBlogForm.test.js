import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogFrom'

describe('<CreateBlogForm />', () => {

  test('should call the event handler with the right details when a new blog is created', () => {
    const createBlog = jest.fn()
    const component = render(<CreateBlogForm createBlog={createBlog} />)
    const form = component.container.querySelector('form')
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')

    fireEvent.change(inputTitle, {
      target: { value: 'Canonical string reduction' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'Edsger W. Dijkstra' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Canonical string reduction')
    expect(createBlog.mock.calls[0][0].author).toBe('Edsger W. Dijkstra')
    expect(createBlog.mock.calls[0][0].url).toBe('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
  })

})
