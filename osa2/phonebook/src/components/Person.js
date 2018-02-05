import React from 'react'

const Person = ({ person, onDelete }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={() => onDelete(person)}>poista</button></td>
    </tr>
  )
}

export default Person