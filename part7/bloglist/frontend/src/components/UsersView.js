import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUsers } from '../reducers/usersReducer'

const UsersView = () => {

  const users = useSelector(selectUsers)

  // const r = users.map(user => )

  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.username}>
              <td>
                <Link to={`${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

}

export default UsersView
