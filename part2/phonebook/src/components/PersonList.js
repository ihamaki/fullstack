import React from 'react'
import Person from './Person'

const PersonList = ({ persons, onDelete }) => {
  return (
    <div>
      <table>
        <tbody>
          {persons.map(person => <Person key={person.name} person={person} onDelete={onDelete} />)}
        </tbody>
      </table>
    </div>
  )
}

export default PersonList