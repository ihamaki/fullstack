import React from 'react'
import Input from './Input'
import Button from './Button'

const Form = ({ onSubmit, state, onNameChange, onNumberChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input name="nimi" value={state.newName} onChange={onNameChange} />
        <Input name="numero" value={state.newNumber} onChange={onNumberChange} />
        <Button text="lisää"/>
      </form>
    </div>
  )
}

export default Form