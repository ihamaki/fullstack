import React from 'react'
import personService from './services/persons'
import Form from './components/Form'
import Input from './components/Input'
import Notification from './components/Notification'
import PersonList from './components/PersonList'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      info: null,
      error: null
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
      if (window.confirm(`${this.state.newName} on jo puhelinluettelossa! Korvataanko vanha numero uudella?`)) {
        const personToUpdate = this.state.persons.find(n => n.name === this.state.newName)
        this.updatePerson(personToUpdate.id)
        return
      } else {
        this.setState({ newName: '' })
        return
      }
    }

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    personService
      .create(personObject)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: '',
          newNumber: '',
          info: 'Henkilön lisäys onnistui!'
        })
      })

    setTimeout(() => {
      this.setState({ info: null })
    }, 5000)
  }

  updatePerson = (id) => {
    const person = this.state.persons.find(n => n.id === id)
    const changedPerson = { ...person, number: this.state.newNumber }
    personService
      .update(id, changedPerson)
      .then(response => {
        this.setState({
          persons: this.state.persons.map(person => person.id !== id ? person : changedPerson),
          newName: '',
          newNumber: '',
          info: 'Numeron päivitys onnistui!'
        })
      })
      .catch(error => {
        this.setState({
          persons: this.state.persons.filter(n => n.id !== id),
          newName: '',
          newNumber: '',
          error: `Henkilö '${person.name}' on jo poistettu palvelimelta`
        })
      })

    setTimeout(() => {
      this.setState({ info: null, error: null })
    }, 5000)
  }

  deletePerson = (person) => {
    if (window.confirm(`Haluatko varmasti poistaa henkilön ${person.name}?`)) {
      personService
        .destroy(person.id)
        .then(response => {
          this.setState({
            persons: this.state.persons.filter(n => n.id !== person.id),
            info: 'Henkilön poisto onnistui!'
          })
        })
        .catch(error => {
          this.setState({
            persons: this.state.persons.filter(n => n.id !== person.id),
            newName: '',
            newNumber: '',
            error: `Henkilö '${person.name}' on jo poistettu palvelimelta`
          })
        })

      setTimeout(() => {
        this.setState({ info: null, error: null })
      }, 5000)
    }
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
        <Notification message={this.state.info} className="success" />
        <Notification message={this.state.error} className="error" />
        <Form
          onSubmit={this.addPerson}
          state={this.state}
          onNameChange={this.handleNameChange}
          onNumberChange={this.handleNumberChange}
        />
        <h2>Numerot</h2>
        <Input name="etsi" value={this.state.filter} onChange={this.handleFilterChange} />
        <PersonList persons={this.filterPersons()} onDelete={this.deletePerson} />
      </div>
    )
  }
}

export default App