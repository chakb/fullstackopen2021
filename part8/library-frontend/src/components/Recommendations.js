import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from '@apollo/client'
import { CURRENT_USER, ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
  const [user, setUser] = useState(null);

  const [getBooksByGenre, resultBooks] = useLazyQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  const resultUser = useQuery(CURRENT_USER)

  useEffect(() => {
    if (resultUser.data) {
      setUser(resultUser.data.me)
    }
  }, [resultUser.data]);

  useEffect(() => {
    if (user) {
      getBooksByGenre({ variables: { genre: user.favoriteGenre } })
    }
  }, [user, getBooksByGenre]);

  if (resultBooks.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <em>{user.favoriteGenre}</em></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {resultBooks.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations;
