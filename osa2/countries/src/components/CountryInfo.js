import React from 'react'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} width="200" alt="country flag"/>
    </div>
  )
}

export default Country