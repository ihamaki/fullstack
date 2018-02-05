import React from 'react'
import Country from './Country'
import CountryInfo from './CountryInfo'

const CountryList = ({ countries, onClick }) => {
  if (countries.length === 0) {
    return <div>no matches</div>
  }
  if (countries.length === 1) {
    return <div><CountryInfo country={countries[0]} /></div>
  }
  if (countries.length >= 10) {
    return <div>too many matches, specify another filter</div>
  }
  return (
    <div>
      {countries.map(country => <Country key={country.alpha2Code} country={country} onClick={onClick}/>)}
    </div>
  )
}

export default CountryList