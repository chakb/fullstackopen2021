import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('');

  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks

  const genres = [...new Set(
    books.map(book => book.genres).flat()
  )]

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <div>in genre <em>{genreFilter ? genreFilter : 'all genres'}</em></div>
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
          {books.map(a =>
            a.genres.includes(genreFilter) || !genreFilter
              ? <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
              : null
          )}
        </tbody>
      </table>
      {genres.map(genre =>
        <button onClick={() => setGenreFilter(genre)} key={genre}>{genre}</button>
      )}
      <button onClick={() => setGenreFilter('')}>all genres</button>
    </div>
  )
}

export default Books