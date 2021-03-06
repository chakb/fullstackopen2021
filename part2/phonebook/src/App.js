import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ onSubmit, name, handleNameChange, number, handleNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person, handleDeletePerson }) => {
  return (
    <li>
      {person.name} {person.number} <button value={person.id} onClick={handleDeletePerson}>delete</button>
    </li>
  )
}

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.name} person={person} handleDeletePerson={handleDeletePerson} />
      )}
    </ul>
  )
}

const Notification = ({ message }) => {
  if (message.text === null) {
    return null
  }

  return (
    <div className={message.className}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({ text: null, className: null })

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personFound = persons.find(person => person.name === newName)

    if (personFound) {
      if (window.confirm(`${personFound.name} is already added to phonebook, replace old number with a new one?`)) {
        const changedPerson = { ...personFound, number: newNumber }
        personService
          .update(personFound.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === personFound.id ? returnedPerson : person))
          })
          .catch(error => {
            setNotificationMessage({
              text: `Information of ${personFound.name} has already been removed from the server`,
              className: 'error'
            })
            setTimeout(() => {
              setNotificationMessage({ ...notificationMessage, text: null })
            }, 5000);
            setPersons(persons.filter(person => person.id !== personFound.id))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .then(() => {
          setNotificationMessage({ text: `Added ${personObject.name}`, className: 'success' })
          setTimeout(() => {
            setNotificationMessage({ ...notificationMessage, text: null })
          }, 5000);

        })
    }
  }

  const handleDeletePerson = (event) => {
    const idToDelete = parseInt(event.target.value)
    const personToDelete = persons.find(person => person.id === idToDelete)
    const personsRemaining = persons.filter(person => person.id !== idToDelete)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(event.target.value)
        .then(() =>
          setPersons(personsRemaining))
        .catch(error => {
          setNotificationMessage({
            text: `Information of ${personToDelete.name} has already been removed from the server`,
            className: 'error'
          })
          setTimeout(() => {
            setNotificationMessage({ ...notificationMessage, text: null })
          }, 5000);
          setPersons(personsRemaining)
        })
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App