import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'       },
    { name: 'Ada Lovelace', number: '39-44-5323523'    },
    { name: 'Dan Abramov', number: '12-43-234345'       },
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [person, setPerson] = useState(() => (
    persons.map(person => (
      <p>{person.name} {person.number}</p>
    ))
  ))

  const addNote = (e) => {
    const name = persons.map(person => person.name)
    const number = persons.map(person => person.number)

    e.preventDefault()

    if (number.includes(newNumber)) {
      alert(`${newNumber} is already exist.`)
      return false
    }

    if (name.includes(newName)) {
      alert(`${newName} is already exist.`)
      return false
    }

    const newObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newObject))

    console.log("persons", persons);
    console.log('persons.concat(newObject)', persons.concat(newObject))

    let temp = () => persons.concat(newObject).map(person => (<p>{person.name} {person.number}</p>))
    setPerson(temp)
    setNewName("")
    setNewNumber("")
  }




  const handlePersonChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  
  


  const handleFilterChange = (e) => {
    setPerson(() => 
      persons.filter(
        person => (
          person.name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1)
        )
        .map(
          filteredName => (
            <p>{filteredName.name} {filteredName.number}</p>
          )
      )
    )
    setFilter(e.target.value)
  }

  


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>      
      <PersonForm 
        newName={newName} 
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        addNote={addNote}
      />
     
      <h3>Numbers</h3>
      <Persons person={person} /> 
    </div>
  )
}

export default App