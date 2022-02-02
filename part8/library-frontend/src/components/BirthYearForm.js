import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, SET_BORN_TO } from '../queries'

const BirthYearForm = ({ authorNames }) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [setBornTo] = useMutation(SET_BORN_TO, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }
    ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    await setBornTo({ variables: { name: name.value, setBornTo: parseInt(birthYear) } })

    setName('')
    setBirthYear('')
  }

  useEffect(() => {
    setName({ value: authorNames[0] })
  }, [authorNames]);

  const handleSelectNameChange = (event) => {
    setName({ value: event.target.value })
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        {/* <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <select value={name.value} onChange={handleSelectNameChange}>
          {authorNames.map(authorName => {
            return (
              <option key={authorName} value={authorName}>{authorName}</option>
            )
          })}
        </select>
        <div>
          born
          <input
            type='number'
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form >
    </div >
  )
}

export default BirthYearForm