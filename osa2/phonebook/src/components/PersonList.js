import React from 'react'
import Person from './Person'

const PersonList = ({ persons }) => {
  return (
    <div>
      <table>
        <tbody>
          {persons.map(person => <Person key={person.name} person={person} />)}
        </tbody>
      </table>
    </div>
  )
}

export default PersonList