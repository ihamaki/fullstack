import React from 'react'
import axios from 'axios'
import Input from './components/Input'
import PersonList from './components/PersonList'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data });
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

    const persons = this.state.persons.concat(personObject)

    this.setState({
      persons,
      newName: '',
      newNumber: ''
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

        <form onSubmit={this.addPerson}>
          <Input name="nimi" value={this.state.newName} onChange={this.handleNameChange} />
          <Input name="numero" value={this.state.newNumber} onChange={this.handleNumberChange} />
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

        <h2>Numerot</h2>

        <Input name="etsi" value={this.state.filter} onChange={this.handleFilterChange} />
        <PersonList persons={this.filterPersons()} />
      </div>
    )
  }
}

export default App