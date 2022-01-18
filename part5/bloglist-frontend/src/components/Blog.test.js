import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      username: 'root',
      name: 'Mr. root',
      id: '61df6edf4c24d44dcc5c69b2',
      blogs: []
    }
  }
  const user = {
    username: 'root',
    name: 'Mr. root',
    id: '61df6edf4c24d44dcc5c69b2',
    blogs: []
  }

  let component

  const update = jest.fn()
  const remove = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} update={update} remove={remove} user={user} />
    )
  })

  test('renders title and author but not url or likes by default ', () => {
    expect(component.container).toHaveTextContent(
      'Canonical string reduction Edsger W. Dijkstra')
    expect(component.container).not.toHaveTextContent(
      'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
    expect(component.container).not.toHaveTextContent(`likes ${blog.likes}`)
  })

  test('renders url and likes when vien button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
    expect(component.container).toHaveTextContent(`likes ${blog.likes}`)
  })

  test('like button is clicked twice', () => {
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)

    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(update.mock.calls).toHaveLength(2)
  })

})
