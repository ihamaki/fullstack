import React from 'react'
import axios from 'axios'
import Input from './components/Input'
import CountryList from './components/CountryList'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data });
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  }

  filterCountries = () => {
    const countries = this.state.countries
    const filter = this.state.filter.trim().toLowerCase()
    const filteredCountries = countries.filter(country => country.name.trim().toLowerCase().match(filter))
    if (filteredCountries.length > 0) {
      return filteredCountries
    }
    return []
  }

  render() {
    return (
      <div>
        <Input name="find countries" value={this.state.filter} onChange={this.handleFilterChange} />
        <CountryList countries={this.filterCountries()} />
      </div>
    )
  }
}

export default App