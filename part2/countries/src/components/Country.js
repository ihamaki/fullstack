import React from 'react'

const Country = ({ country, onClick }) => {
  return (
    <div name={country.name} onClick={() => onClick(country.name)}>
      {country.name}
    </div>
  )
}

export default Country