import React from 'react'
import personService from './services/persons'
import Form from './components/Form'
import Input from './components/Input'
import PersonList from './components/PersonList'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  addPerson = (event) => {
    event.preventDefault()

    if (this.state.newName === '' || this.state.newNumber === '') {
      alert('Täytä henkilölle nimi ja numero!')
      return
    }

    const names = this.state.persons.map(person => person.name)
    if (names.includes(this.state.newName)) {
      alert('Nimi on jo puhelinluettelossa!')
      this.setState({ newName: '' })
      return
    }

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber,
      id: this.state.newName
    }

    personService
      .create(personObject)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: '',
          newNumber: ''
        })
      })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  filterPersons = () => {
    const filter = this.state.filter.trim().toLowerCase()
    if (filter === '') { return this.state.persons }
    return this.state.persons.filter(person => person.name.trim().toLowerCase().match(filter))
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Form
          onSubmit={this.addPerson}
          state={this.state}
          onNameChange={this.handleNameChange}
          onNumberChange={this.handleNumberChange}
        />
        <h2>Numerot</h2>
        <Input name="etsi" value={this.state.filter} onChange={this.handleFilterChange} />
        <PersonList persons={this.filterPersons()} />
      </div>
    )
  }
}

export default App