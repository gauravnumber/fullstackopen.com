import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const Temp = ({ persons, setPerson, setPersons }) => {


  return (

          persons.map(person => (
            <p
              key={person.id}
            >{person.name} {person.number} <button
                                              key={person.id}
                                              onClick={() => {
                                                if (window.confirm(`Delete ${person.name} ?`)) {
                                                  personService
                                                    .deletePerson(person.id)

                                                  let t = persons.filter(p => p.id !== person.id)
                                                  setPersons(t)
                                                  let temp
                                                  temp = <Temp persons={t}  setPerson={setPerson} setPersons={setPersons} />
                                                  setPerson(temp)
        
                                                }
                                              }}
                                            >delete
                                            </button>
              </p>
            ))
          )
}

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [person, setPerson] = useState(null)

  const addNote = (e) => {
    const name = persons.map(person => person.name)
    const number = persons.map(person => person.number)

    e.preventDefault()

    if (number.includes(newNumber)) {
      alert(`${newNumber} is already exist.`)
      return false
    }

    if (name.includes(newName)) {
    const person = persons.find(person => person.name === newName)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        console.log("newName", newName)
        console.log("person", person)

        const newObject = {
          ...person,
          number: newNumber
        }

        console.log("newNumber", newNumber)
        console.log("newObject", newObject)

        personService
          .updatePhoneNumber(person.id, newObject)
          .then(response => {
            console.log(response)

        })


        let t = persons.filter(p => p.id !== person.id).concat(newObject)
        console.log("t", t)

        setPersons(t)
        let temp
        temp = <Temp persons={t}  setPerson={setPerson} setPersons={setPersons} />
        setPerson(temp)
        
        setNewName("")
        setNewNumber("")


      }

      // return false
    } else {


    const newObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    personService
      .create(newObject)

    setPersons(persons.concat(newObject))


    console.log("persons", persons);
    console.log('persons.concat(newObject)', persons.concat(newObject))

    let temp = <Temp persons={persons.concat(newObject)} setPerson={setPerson} setPersons={setPersons} />
    // let temp = <Temp persons={persons.concat(newObject)} setPerson={setPerson} setPersons={setPersons} />

    // let temp = () => persons.concat(newObject).map(person => (<p key={person.id}>{person.name} {person.number} <button>delete</button></p>))
    setPerson(temp)
    setNewName("")
    setNewNumber("")

    }
  }

  // const handleDeletePerson = id => {
  //   if (persons) {
  //     let temp = persons.filter(person => person.id !== id)
  //     console.log(temp);

  //   }
  // }

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
            // <p key={filteredName.id}>{filteredName.name} {filteredName.number} <button>delete</button></p>
            <Temp key={filteredName.id} persons={[ filteredName]} setPerson={setPerson} setPersons={setPersons} />
            // <Temp key={filteredName.id} persons={[ filteredName]} setPerson={setPerson} setPersons={setPersons} />
            // <p key={filteredName.id}>{filteredName.name} {filteredName.number} <button>delete</button></p>
          )
      )
    )
    setFilter(e.target.value)
  }



  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)

        let temp
        temp = <Temp persons={persons} setPerson={setPerson} setPersons={setPersons} />
        // temp = <Temp persons={persons} setPerson={setPerson} setPersons={setPersons} />
         // temp = (
         //  persons.map(person => {

         //    console.log("person", person)
         //    // return <Persons key={person.id} person={person} />
         //    return <p key={person.id}>{person.name} {person.number} <button key={person.id} >delete</button></p>

         //  }))

        setPerson(temp)
        // setPerson(persons)

      })
  }, [])

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
      <Persons
        person={person}
      />
    </div>
  )
}

export default App
